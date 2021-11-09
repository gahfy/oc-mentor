let getReport = function() {
  return new Promise((resolve, reject) => {
    getSessions().then((sessions) => {
      console.log(sessions);
      let report = {}
      report.currentMonth = {}
      report.currentMonth.amount = 0
      report.currentMonth.selfFinancedStudents = {}
      report.currentMonth.selfFinancedSessionLevel1 = []
      report.currentMonth.selfFinancedSessionLevel1LatelyCancelled = []
      report.currentMonth.selfFinancedSessionLevel2 = []
      report.currentMonth.selfFinancedSessionLevel2LatelyCancelled = []
      report.currentMonth.selfFinancedSessionLevel3 = []
      report.currentMonth.selfFinancedSessionLevel3LatelyCancelled = []
      report.currentMonth.financedByThirdPartySessionLevel1 = []
      report.currentMonth.financedByThirdPartySessionLevel1LatelyCancelled = []
      report.currentMonth.financedByThirdPartySessionLevel2 = []
      report.currentMonth.financedByThirdPartySessionLevel2LatelyCancelled = []
      report.currentMonth.financedByThirdPartySessionLevel3 = []
      report.currentMonth.financedByThirdPartySessionLevel3LatelyCancelled = []
      report.currentMonth.presentationLevel1 = []
      report.currentMonth.presentationLevel1LatelyCancelled = []
      report.currentMonth.presentationLevel2 = []
      report.currentMonth.presentationLevel2LatelyCancelled = []
      report.currentMonth.presentationLevel3 = []
      report.currentMonth.presentationLevel3LatelyCancelled = []
      report.lastMonth = {}
      report.lastMonth.amount = 0
      report.lastMonth.selfFinancedStudents = {}
      report.lastMonth.selfFinancedSessionLevel1 = []
      report.lastMonth.selfFinancedSessionLevel1LatelyCancelled = []
      report.lastMonth.selfFinancedSessionLevel2 = []
      report.lastMonth.selfFinancedSessionLevel2LatelyCancelled = []
      report.lastMonth.selfFinancedSessionLevel3 = []
      report.lastMonth.selfFinancedSessionLevel3LatelyCancelled = []
      report.lastMonth.financedByThirdPartySessionLevel1 = []
      report.lastMonth.financedByThirdPartySessionLevel1LatelyCancelled = []
      report.lastMonth.financedByThirdPartySessionLevel2 = []
      report.lastMonth.financedByThirdPartySessionLevel2LatelyCancelled = []
      report.lastMonth.financedByThirdPartySessionLevel3 = []
      report.lastMonth.financedByThirdPartySessionLevel3LatelyCancelled = []
      report.lastMonth.presentationLevel1 = []
      report.lastMonth.presentationLevel1LatelyCancelled = []
      report.lastMonth.presentationLevel2 = []
      report.lastMonth.presentationLevel2LatelyCancelled = []
      report.lastMonth.presentationLevel3 = []
      report.lastMonth.presentationLevel3LatelyCancelled = []
      report.beforeLastMonth = {}
      report.beforeLastMonth.amount = 0
      report.beforeLastMonth.selfFinancedStudents = {}
      report.beforeLastMonth.selfFinancedSessionLevel1 = []
      report.beforeLastMonth.selfFinancedSessionLevel1LatelyCancelled = []
      report.beforeLastMonth.selfFinancedSessionLevel2 = []
      report.beforeLastMonth.selfFinancedSessionLevel2LatelyCancelled = []
      report.beforeLastMonth.selfFinancedSessionLevel3 = []
      report.beforeLastMonth.selfFinancedSessionLevel3LatelyCancelled = []
      report.beforeLastMonth.financedByThirdPartySessionLevel1 = []
      report.beforeLastMonth.financedByThirdPartySessionLevel1LatelyCancelled = []
      report.beforeLastMonth.financedByThirdPartySessionLevel2 = []
      report.beforeLastMonth.financedByThirdPartySessionLevel2LatelyCancelled = []
      report.beforeLastMonth.financedByThirdPartySessionLevel3 = []
      report.beforeLastMonth.financedByThirdPartySessionLevel3LatelyCancelled = []
      report.beforeLastMonth.presentationLevel1 = []
      report.beforeLastMonth.presentationLevel1LatelyCancelled = []
      report.beforeLastMonth.presentationLevel2 = []
      report.beforeLastMonth.presentationLevel2LatelyCancelled = []
      report.beforeLastMonth.presentationLevel3 = []
      report.beforeLastMonth.presentationLevel3LatelyCancelled = []

      sessions.forEach((session) => {
        if(!isOlderThanGivenMonth(Date.parse(session.sessionDate), 0)) {
          if(session.type == "presentation") {
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.currentMonth.presentationLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.currentMonth.presentationLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.currentMonth.presentationLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.currentMonth.presentationLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.currentMonth.presentationLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.currentMonth.presentationLevel3LatelyCancelled.push(session)
              }
            }
          } else if(session.recipient.isSelfFinanced) {
            if(session.status == "completed" || session.status == "marked student as absent" || session.status == "late canceled") {
              report.currentMonth.selfFinancedStudents[session.recipient.id] = session.recipient;
            }
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.currentMonth.selfFinancedSessionLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.currentMonth.selfFinancedSessionLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.currentMonth.selfFinancedSessionLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.currentMonth.selfFinancedSessionLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.currentMonth.selfFinancedSessionLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.currentMonth.selfFinancedSessionLevel3LatelyCancelled.push(session)
              }
            }
          } else {
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.currentMonth.financedByThirdPartySessionLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.currentMonth.financedByThirdPartySessionLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.currentMonth.financedByThirdPartySessionLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.currentMonth.financedByThirdPartySessionLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.currentMonth.financedByThirdPartySessionLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.currentMonth.financedByThirdPartySessionLevel3LatelyCancelled.push(session)
              }
            }
          }
        }

        else if(!isOlderThanGivenMonth(Date.parse(session.sessionDate), 1)) {
          if(session.type == "presentation") {
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.lastMonth.presentationLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.lastMonth.presentationLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.lastMonth.presentationLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.lastMonth.presentationLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.lastMonth.presentationLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.lastMonth.presentationLevel3LatelyCancelled.push(session)
              }
            }
          } else if(session.recipient.isSelfFinanced) {
            if(session.status == "completed" || session.status == "marked student as absent" || session.status == "late canceled") {
              report.lastMonth.selfFinancedStudents[session.recipient.id] = session.recipient;
            }
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.lastMonth.selfFinancedSessionLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.lastMonth.selfFinancedSessionLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.lastMonth.selfFinancedSessionLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.lastMonth.selfFinancedSessionLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.lastMonth.selfFinancedSessionLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.lastMonth.selfFinancedSessionLevel3LatelyCancelled.push(session)
              }
            }
          } else {
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.lastMonth.financedByThirdPartySessionLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.lastMonth.financedByThirdPartySessionLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.lastMonth.financedByThirdPartySessionLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.lastMonth.financedByThirdPartySessionLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.lastMonth.financedByThirdPartySessionLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.lastMonth.financedByThirdPartySessionLevel3LatelyCancelled.push(session)
              }
            }
          }
        }

        else {
          if(session.type == "presentation") {
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.beforeLastMonth.presentationLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.beforeLastMonth.presentationLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.beforeLastMonth.presentationLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.beforeLastMonth.presentationLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.beforeLastMonth.presentationLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.beforeLastMonth.presentationLevel3LatelyCancelled.push(session)
              }
            }
          } else if(session.recipient.isSelfFinanced) {
            if(session.status == "completed" || session.status == "marked student as absent" || session.status == "late canceled") {
              report.beforeLastMonth.selfFinancedStudents[session.recipient.id] = session.recipient;
            }
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.beforeLastMonth.selfFinancedSessionLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.beforeLastMonth.selfFinancedSessionLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.beforeLastMonth.selfFinancedSessionLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.beforeLastMonth.selfFinancedSessionLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.beforeLastMonth.selfFinancedSessionLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.beforeLastMonth.selfFinancedSessionLevel3LatelyCancelled.push(session)
              }
            }
          } else {
            if(session.status == "completed") {
              if(session.projectLevel == "1") {
                report.beforeLastMonth.financedByThirdPartySessionLevel1.push(session)
              } else if(session.projectLevel == "2") {
                report.beforeLastMonth.financedByThirdPartySessionLevel2.push(session)
              } else if(session.projectLevel == "3") {
                report.beforeLastMonth.financedByThirdPartySessionLevel3.push(session)
              }
            } else if(session.status == "marked student as absent" || session.status == "late canceled") {
              if(session.projectLevel == "1") {
                report.beforeLastMonth.financedByThirdPartySessionLevel1LatelyCancelled.push(session)
              } else if(session.projectLevel == "2") {
                report.beforeLastMonth.financedByThirdPartySessionLevel2LatelyCancelled.push(session)
              } else if(session.projectLevel == "3") {
                report.beforeLastMonth.financedByThirdPartySessionLevel3LatelyCancelled.push(session)
              }
            }
          }
        }

        report.currentMonth.amount = Object.keys(report.currentMonth.selfFinancedStudents).length*30 +
                                  report.currentMonth.presentationLevel1.length*30 +
                                  report.currentMonth.presentationLevel2.length*35 +
                                  report.currentMonth.presentationLevel3.length*40 +
                                  report.currentMonth.presentationLevel1LatelyCancelled.length*15 +
                                  report.currentMonth.presentationLevel2LatelyCancelled.length*17.5 +
                                  report.currentMonth.presentationLevel3LatelyCancelled.length*20 +
                                  report.currentMonth.financedByThirdPartySessionLevel1.length*30 +
                                  report.currentMonth.financedByThirdPartySessionLevel2.length*35 +
                                  report.currentMonth.financedByThirdPartySessionLevel3.length*40 +
                                  report.currentMonth.financedByThirdPartySessionLevel1LatelyCancelled.length*15 +
                                  report.currentMonth.financedByThirdPartySessionLevel2LatelyCancelled.length*17.5 +
                                  report.currentMonth.financedByThirdPartySessionLevel3LatelyCancelled.length*20 +
                                  report.currentMonth.selfFinancedSessionLevel1.length*15 +
                                  report.currentMonth.selfFinancedSessionLevel2.length*17.5 +
                                  report.currentMonth.selfFinancedSessionLevel3.length*20 +
                                  report.currentMonth.selfFinancedSessionLevel1LatelyCancelled.length*7.5 +
                                  report.currentMonth.selfFinancedSessionLevel2LatelyCancelled.length*8.75 +
                                  report.currentMonth.selfFinancedSessionLevel3LatelyCancelled.length*10;

        report.lastMonth.amount = Object.keys(report.lastMonth.selfFinancedStudents).length*30 +
                                  report.lastMonth.presentationLevel1.length*30 +
                                  report.lastMonth.presentationLevel2.length*35 +
                                  report.lastMonth.presentationLevel3.length*40 +
                                  report.lastMonth.presentationLevel1LatelyCancelled.length*15 +
                                  report.lastMonth.presentationLevel2LatelyCancelled.length*17.5 +
                                  report.lastMonth.presentationLevel3LatelyCancelled.length*20 +
                                  report.lastMonth.financedByThirdPartySessionLevel1.length*30 +
                                  report.lastMonth.financedByThirdPartySessionLevel2.length*35 +
                                  report.lastMonth.financedByThirdPartySessionLevel3.length*40 +
                                  report.lastMonth.financedByThirdPartySessionLevel1LatelyCancelled.length*15 +
                                  report.lastMonth.financedByThirdPartySessionLevel2LatelyCancelled.length*17.5 +
                                  report.lastMonth.financedByThirdPartySessionLevel3LatelyCancelled.length*20 +
                                  report.lastMonth.selfFinancedSessionLevel1.length*15 +
                                  report.lastMonth.selfFinancedSessionLevel2.length*17.5 +
                                  report.lastMonth.selfFinancedSessionLevel3.length*20 +
                                  report.lastMonth.selfFinancedSessionLevel1LatelyCancelled.length*7.5 +
                                  report.lastMonth.selfFinancedSessionLevel2LatelyCancelled.length*8.75 +
                                  report.lastMonth.selfFinancedSessionLevel3LatelyCancelled.length*10;

        report.beforeLastMonth.amount = Object.keys(report.beforeLastMonth.selfFinancedStudents).length*30 +
                                  report.beforeLastMonth.presentationLevel1.length*30 +
                                  report.beforeLastMonth.presentationLevel2.length*35 +
                                  report.beforeLastMonth.presentationLevel3.length*40 +
                                  report.beforeLastMonth.presentationLevel1LatelyCancelled.length*15 +
                                  report.beforeLastMonth.presentationLevel2LatelyCancelled.length*17.5 +
                                  report.beforeLastMonth.presentationLevel3LatelyCancelled.length*20 +
                                  report.beforeLastMonth.financedByThirdPartySessionLevel1.length*30 +
                                  report.beforeLastMonth.financedByThirdPartySessionLevel2.length*35 +
                                  report.beforeLastMonth.financedByThirdPartySessionLevel3.length*40 +
                                  report.beforeLastMonth.financedByThirdPartySessionLevel1LatelyCancelled.length*15 +
                                  report.beforeLastMonth.financedByThirdPartySessionLevel2LatelyCancelled.length*17.5 +
                                  report.beforeLastMonth.financedByThirdPartySessionLevel3LatelyCancelled.length*20 +
                                  report.beforeLastMonth.selfFinancedSessionLevel1.length*15 +
                                  report.beforeLastMonth.selfFinancedSessionLevel2.length*17.5 +
                                  report.beforeLastMonth.selfFinancedSessionLevel3.length*20 +
                                  report.beforeLastMonth.selfFinancedSessionLevel1LatelyCancelled.length*7.5 +
                                  report.beforeLastMonth.selfFinancedSessionLevel2LatelyCancelled.length*8.75 +
                                  report.beforeLastMonth.selfFinancedSessionLevel3LatelyCancelled.length*10;

      });

      resolve(report);
    }).catch((error) => {
      reject(error);
    })
  });
}
