function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function createMultiArray(members, nSubElems, nTeams) {
    let tempArray = [];

    for (let i = 0; i < members.length; i++) {
        if (nSubElems === 0) {
            return members;
        }

        if (String(nSubElems).split(".").length > 1) {
            let template = [...Array(nTeams).keys()];

            console.log(`Number of double arrays: ${members.length % nTeams}`);

            for (let index = 0; index < members.length % nTeams; index++) {
                template[index] = [0, 0];
            }

            console.log("Template");
            console.log(template);

            template.forEach((val) => {
                if (val instanceof Array) {
                    let teamArray = []
                    for (let index = 0; index < val.length; index++) {
                        teamArray.push(members.pop())
                    }
                    tempArray.push(teamArray)
                } else {
                    tempArray.push([members.pop()])
                }
            })

        } else {
            nSubElems = parseInt(nSubElems);
            const element = members[i];

            if (i % nSubElems === 0) {
                tempArray.push([element]);
            } else {
                tempArray[Math.floor((1 / nSubElems) * i)][
                    i % nSubElems
                ] = element;
            }
        }
    }

    console.log("Returning");
    console.log(tempArray);

    return tempArray;
}

module.exports = (members, method, quantity) => {
    let splitMembers = members.split(",");
    return createMultiArray(
        shuffle(splitMembers),
        method === "perNumMembers" ? quantity : splitMembers.length / quantity,
        method !== "perNumMembers" ? quantity : undefined
    );
};
