const readline = require('readline');

let balance = 1000;
let isRunning = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to the Bank Transaction Simulator!');
console.log('Initial balance: $1000.00');
console.log('Commands: \nEnter amount to transfer \n"reset" to reset balance \n"quit" to exit.\n');

function prompt(question) {
  return new Promise((resolve) => {
    if (!isRunning) {
      resolve(null);
      return;
    }
    rl.question(question, resolve);
  });
}

function checkBalance(amount) {
  return new Promise((resolve, reject) => {
    if (!isRunning) {
      reject('Simulator closed');
      return;
    }
    
    console.log(`\nChecking balance... (Current balance: $${balance.toFixed(2)})`);
    
    setTimeout(() => {
      if (!isRunning) {
        reject('Simulator closed');
        return;
      }
      if (balance >= amount) {
        console.log('✓ Sufficient funds available.');
        resolve();
      } else {
        reject('Insufficient funds');
      }
    }, 1000);
  });
}

function deductAmount(amount) {
  return new Promise((resolve, reject) => {
    if (!isRunning) {
      reject('Simulator closed');
      return;
    }
    
    console.log(`\nDeducting $${amount.toFixed(2)}...`);
    
    setTimeout(() => {
      if (!isRunning) {
        reject('Simulator closed');
        return;
      }
      balance -= amount;
      console.log('✓ Amount deducted.');
      resolve();
    }, 1000);
  });
}

function confirmTransaction() {
  return new Promise((resolve, reject) => {
    if (!isRunning) {
      reject('Simulator closed');
      return;
    }
    
    console.log(`\nConfirming transaction...`);
    
    setTimeout(() => {
      if (!isRunning) {
        reject('Simulator closed');
        return;
      }
      if (Math.random() < 0.1) {
        reject('Transaction confirmation failed - please try again.');
      } else {
        console.log('✓ Transaction confirmed.');
        resolve('Transaction complete');
      }
    }, 1000);
  });
}

async function handleTransaction() {
  if (!isRunning) return;

  try {
    const amountStr = await prompt('Enter the amount to transfer (or "quit" to exit, "reset" to reset balance): $');
    
    if (amountStr === null) return;
    
    const input = amountStr.toLowerCase().trim();
    
    if (input === 'quit') {
      console.log('Goodbye!');
      isRunning = false;
      rl.close();
      return;
    }
    
    if (input === 'reset') {
      balance = 1000;
      console.log(`\nBalance reset to $${balance.toFixed(2)}`);
      setTimeout(() => handleTransaction(), 1000);
      return;
    }
    
    const amount = parseFloat(amountStr);
    
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a positive number.');
      setTimeout(() => handleTransaction(), 1000);
      return;
    }
    
    console.log(`\n--- Starting Transaction for $${amount.toFixed(2)} ---`);
    
    await checkBalance(amount);
    await deductAmount(amount);
    const result = await confirmTransaction();
    
    console.log(`\n${result}!`);
    
    setTimeout(() => {
      if (isRunning) {
        console.log(`\nNew balance: $${balance.toFixed(2)}`);
      }
    }, 1000);
    
  } catch (error) {
    if (error.message !== 'Simulator closed') {
      console.log(`\nTransaction failed: ${error}`);
    }
  } finally {
    if (isRunning) {
      setTimeout(() => handleTransaction(), 2000);
    }
  }
}

handleTransaction();
