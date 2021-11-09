let getUserId = function() {
  if(localStorage.getItem("apc_user_id")!=null){
    return localStorage.getItem("apc_user_id");
  } else {
    throw "Cannot find user id in local storage"
  }
}

let getAccessToken = function() {
  for (var key in localStorage) {
    if(key.endsWith("__oc-sdk-access-token")) {
      if(localStorage.getItem(key+"-grant") == "implicit") {
        return localStorage.getItem(key);
      }
    }
  }
  throw "Cannot find access token in local storage";
}
