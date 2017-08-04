const users = [{
    id: 1,
    name: "Andrew",
    schoolId: 101
}, {
    id: 2,
    name: "Jessica",
    schoolId: 909
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 100
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        var studentsSameSchool = grades.filter((user) => user.schoolId === schoolId);

        if (studentsSameSchool.length > 0) {
            resolve(studentsSameSchool)
        } else {
            reject(`couldn't find any students with schoolId of ${schoolId}`);
        }
    })
}

// getGrades(999).then( (data) => {
//     console.log(data);
// }).catch( (err) => {
//     console.log(`error: ${err}`);
// })

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        }
        else {
            reject(`unable to find user with id of ${id}.`)
        }
    })
};

// getUser(1).then( (user) => {
//     console.log(user);
// }).catch( (e) => {
//     console.log(e);
// });

//andrew has 83% average in the class
const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempUser) => { //return first promise http request
        user = tempUser;
        return getGrades(user.schoolId); //return second promise http request (nested within first promise)
    })
    .then((grades) => { //then chaining uses data from second promise
        //average of all in the school
        let average = 0;
        if(grades.length>0){
            average = grades.map( (grade)=> grade.grade).reduce( (total, value) => total + value) / grades.length;
        }
        
        //return our string
        return `${user.name} got ${average}% average in class`;
    })
}

//async always returns a promise that has resolve and reject
//same functionality as this:
//() => {
//     return new Promise( (resolve, reject) => {
//          resolve('Mike');
//         reject('this is error')
//     })
// }

const getStatusAlt = async (userId) => {
    // throw new Error("This is an error");
    // return 'Mike';
    const user = await getUser(userId);  //await must be used inside of an async functioning. we're awaiting for promise to resolve, which will store that data into user. if it rejects, then const user will never be created and it will throw an error. Without the word 'await', you will have the value instead of returning the promise. 'Await' must be used inside of async function..cannot be used globally
    const grades = await getGrades(user.schoolId);
     //average of all in the school
    let average = 0;
    if(grades.length>0){
            average = grades.map( (grade)=> grade.grade).reduce( (total, value) => total + value) / grades.length;
    }
        
    return `${user.name} got ${average}% average in class`;
}

getStatusAlt(1).then( (data)=> {
    console.log(data);  
}).catch( (err)=> {
    console.log(err);
});

// getStatus(1).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })