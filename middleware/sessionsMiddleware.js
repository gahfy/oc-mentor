let getSessions = function() {
  var sessions = [];
  var students = [];
  return new Promise((resolve, reject) => {
    new Promise((resolve2, reject2) => {
      getSessionsRecursive(resolve2, reject2, 0, 19, sessions)
    }).then((sessions) => {
      getStudentsRecursive(resolve, reject, 0, sessions, students);
    });
  })
}

let getSessionsRecursive = function(resolve, reject, startIndex, endIndex, sessions) {
  getSessionsInRange(startIndex, endIndex).then((value) => {
    let currentSessions = JSON.parse(value);
    var endReached = false;

    currentSessions.forEach(currentSession => {
      if(!isOlderThanGivenMonth(Date.parse(currentSession.sessionDate), 2)) {
        sessions.push(currentSession)
      } else {
        endReached = true;
      }
    });

    if(!endReached && currentSessions.length == 20) {
      getSessionsRecursive(resolve, reject, startIndex+20, endIndex+20, sessions)
    } else {
      resolve(sessions)
    }
  }).catch((error) => {
    reject(error);
  })
}

let getStudentsRecursive = function(resolve, reject, currentIndex, sessions, students) {
  if(currentIndex == sessions.length) {
    resolve(sessions);
  }
  if(sessions[currentIndex].type == "mentoring") {
    isStudentSelfFinancedSync(sessions[currentIndex].recipient.id, students).then((isSelfFinanced) => {
      sessions[currentIndex].recipient.isSelfFinanced = isSelfFinanced
      students[sessions[currentIndex].recipient.id] = isSelfFinanced
      getStudentsRecursive(resolve, reject, currentIndex+1, sessions, students);
    }).catch((error) => {
      reject(error)
    })
  } else {
    getStudentsRecursive(resolve, reject, currentIndex+1, sessions, students);
  }
}

let isStudentSelfFinancedSync = function(id, students) {
  return new Promise((resolve, reject) => {
    if(typeof(students[id])!="undefined"){
      resolve(students[id])
    } else {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", "https://openclassrooms.com/mentorship/students/"+id+"/dashboard", true);
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response.includes("Self-financed") || this.response.includes("Auto-financé"));
          } else {
            reject("Cannot get student with id "+id+" because of HTTP status: "+this.status);
          }
        }
      };
      xhttp.onerror = function() {
        reject("Cannot get student with id "+id+" because of error: "+this.statusText);
      };
      xhttp.send();
    }
  });
}

let getSessionsInRange = function(startRange, endRange) {
  let accessToken = getAccessToken();
  let userId = getUserId();

  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.openclassrooms.com/users/"+userId+"/sessions?actor=expert&life-cycle-status=canceled%2Ccompleted%2Clate%20canceled%2Cmarked%20student%20as%20absent", true);
    xhttp.setRequestHeader("authorization", "Bearer "+accessToken);
    xhttp.setRequestHeader("range", "items="+startRange+"-"+endRange);
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject("Cannot get the sessions for range "+startRange+"-"+endRange+" because of HTTP status: "+this.status);
        }
      }
    };
    xhttp.onerror = function () {
      reject("Cannot get the sessions for range "+startRange+"-"+endRange+" because of error: "+this.statusText);
    };
    xhttp.send();
  });
}
