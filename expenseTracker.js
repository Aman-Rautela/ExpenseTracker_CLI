const { error } = require('console');
const {json2csv} = require('json-2-csv');
const fs = require('fs');
const path = require('path');
const[, , cmds, ...args] = process.argv;
const location = path.join(__dirname, 'expenseTracker.json');

// console.log(__dirname)
// console.log(location);

if(!fs.existsSync(location)){
    console.log("No file named expenseTracker is found!");
    fs.writeFileSync(location, JSON.stringify([], null, 2));
    console.log("File is created now!")
}

function addExpense(){
    fs.readFile(location, 'utf-8', (error, data) =>{
        if(error){
            console.log("Error in reading the file!!");
        }
        try{
            const dataParsed = JSON.parse(data);
            if(cmds === 'add'){
                const expense = args.slice(0, -1).join(' ');        //to join all the agrs expect the last one
                const amount = parseInt(args[args.length - 1]);     //to acces the last argument - amount
                if(!expense || !amount){
                    console.log("HEYYY YOU GOTTAA GIVE ME A RECENT EXPENSE or AN AMOUNT TO ADD!!");
                    process.exit(1);
                }
                const newId = Date.now();
                const newDate = new Date().toLocaleString('en',{
                    day : '2-digit',
                    month : 'short',
                    year : '2-digit'
                });
                const newData = {id: newId, date: newDate, discription: expense, amount: amount};
                dataParsed.push(newData);
                fs.writeFileSync(location, JSON.stringify(dataParsed, null, 2));   
            }
        }catch(error){
            console.log("OOPS!!",error);
        }
    })
}

function viewExpense(){
    console.log("-------------YOUR LIST OF EXPENSES-------------")
    const data = fs.readFileSync(location,'utf-8');
    const expenseData = JSON.parse(data);

    if(expenseData.length === 0){
        console.log("THERE IS NO EXPENSE TO SEE");
        process.exit(1);
    }else{
        expenseData.forEach(expensed =>{
            console.log(` ID: ${expensed.id}\n Date: ${expensed.date}\n Discription: ${expensed.discription}\n Amount: ${expensed.amount}`);
            console.log(`----------------------------------------`);
        })
    }
}

function deleteExpense(){
    const data = fs.readFileSync(location, 'utf-8');
    const paresedExpense = JSON.parse(data);

    if(paresedExpense === 0){
        console.log("THERE IS NOTHING TO DELETE");
        process.exit(1);
    }else{
        const id = Number(args[0]);
        const deleteIdx = paresedExpense.findIndex(item => item.id === id);
        if(!deleteIdx){
            console.log(`ID - ${id} not found`);
            process.exit(1);
        }else{
            paresedExpense.splice(deleteIdx, 1);
            fs.writeFileSync(location, JSON.stringify(paresedExpense, null, 2));
            console.log(`EXPENSE WITH ID - ${id} IS DELETED`);
        }
    }
}

function updateExpenses(){
    console.log('-----------------UPDATION-----------------');
    const data = fs.readFileSync(location, 'utf-8');
    const updateExpense = JSON.parse(data);

    const id = Number(args[0]);
    if (isNaN(id)) {
        console.log("Please provide a valid numeric ID to update!");
        process.exit(1);
    }
    const updateIdx = updateExpense.findIndex(item => item.id === id);
    const newAmount = Number(args[args.length - 1]);
    if(isNaN(newAmount)){
        console.log("HEYYY YOU WANNA CHANGE THE AMOUNT, SO GIVE ME ONE TO CHANGE");
        process.exit(1);
    }else{
        updateExpense[updateIdx].amount = newAmount;
        fs.writeFileSync(location, JSON.stringify(updateExpense, null, 2));
        console.log(`EXPENSE UPDATED SUCCESSFULLY OF ID- ${id}`);
    }
}


function summary(){
    console.log('-----------------SUMMARY-----------------');
    const data = fs.readFileSync(location, 'utf-8');
    const totalSummary = JSON.parse(data);

    const total = totalSummary.reduce((x, y) =>{
        return x + y.amount
    }, 0)

    console.log(`Total Expenses till now - ${total}`);
}

function currentMonthSummary(){
    const data = fs.readFileSync(location,'utf-8');
    const monthSummary = JSON.parse(data);
    const date = new Date();
    const month = args[0] ? Number(args[0]) : new Date().getMonth() + 1;    //take date from cmd or take the currrent month
    const filteredMonth = monthSummary.filter(expense =>{
        const expectedMonth = new Date(expense.date).getMonth() + 1;
        return month === expectedMonth; 
    })
    const totalExpense = filteredMonth.reduce((x, y) =>{
        return x + y.amount;
    },0)
    const monthName = new Date(0, month - 1).toLocaleString('en',{month: 'short'});
    console.log(`THE TOTAL EXPENSE FOR - ${monthName.toUpperCase()} is - ${totalExpense}`)

    // const dateObj = new Date(dateElement);      //convert the date string to Date obj
    // const actualMonth = dateObj.getMonth() + 1;

    // const monthIdx = monthSummary.findIndex(mth => mth.actualMonth === month)
}

async function toCsv(){
    const data = fs.readFileSync(location, 'utf-8');
    const pasredData = JSON.parse(data);
    try{
            const csv = json2csv(pasredData);
            fs.writeFile('expense.csv', csv, 'utf-8', (error) =>{
            if(error){
                console.log("Some error occured - file either not saved or corrupted file saved.");
            }else{
                console.log("It\s, Saved");
            }
        });
    }catch(err){
        console.log("OOPS!!!!",err);
    }
}

switch(cmds){
    case 'add':
        addExpense();
        break;
    case 'view':
        viewExpense();
        break;
    case 'delete':
        deleteExpense();
        break;
    case 'update':
        updateExpenses();
        break;
    case 'summary':
        summary();
        break;
    case 'monthSummary':
        currentMonthSummary();
        break;
    case 'toCsv':
        toCsv();
        break;
    default:
        console.log("--------------------AYYOOO PUT RIGHT COMMANDS HERE------------");
}



