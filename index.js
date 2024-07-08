// Constants for tax rates and thresholds
const taxRates = [
    { min: 0, max: 24000, rate: 10 },
    { min: 24001, max: 32333, rate: 25 },
    { min: 32334, max: 500000, rate: 30 },
    { min: 500001, max: 800000, rate: 32.5 },
    { min: 800001, max: Infinity, rate: 35 }
];

const nhifDeductions = [
    { min: 0, max: 5999, deduction: 150 },
    { min: 6000, max: 7999, deduction: 300 },
    { min: 8000, max: 11999, deduction: 400 },
    { min: 12000, max: 14999, deduction: 500 },
    { min: 15000, max: 19999, deduction: 600 },
    { min: 20000, max: 24999, deduction: 750 },
    { min: 25000, max: 29999, deduction: 850 },
    { min: 30000, max: 34999, deduction: 900 },
    { min: 35000, max: 39999, deduction: 950 },
    { min: 40000, max: 44999, deduction: 1000 },
    { min: 45000, max: 49999, deduction: 1100 },
    { min: 50000, max: 59999, deduction: 1200 },
    { min: 60000, max: 69999, deduction: 1300 },
    { min: 70000, max: 79999, deduction: 1400 },
    { min: 80000, max: 89999, deduction: 1500 },
    { min: 90000, max: 99999, deduction: 1600 },
    { min: 100000, max: Infinity, deduction: 1700 }
];

const nssfRates = {
    tier1: { min: 0, max: 7000, employeeRate: 6, employerRate: 6 },
    tier2: { min: 7001, max: 36000, employeeRate: 6, employerRate: 6 }
};

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE
    let taxableIncome = grossSalary * 12; // Annualize gross salary
    let paye = 0;

    for (let i = 0; i < taxRates.length; i++) {
        if (taxableIncome > taxRates[i].min && taxableIncome <= taxRates[i].max) {
            paye = (taxableIncome * taxRates[i].rate) / 100 / 12; // Monthly PAYE
            break;
        }
    }

    // Calculate NHIF deduction
    let nhifDeduction = 0;

    for (let i = 0; i < nhifDeductions.length; i++) {
        if (grossSalary >= nhifDeductions[i].min && grossSalary <= nhifDeductions[i].max) {
            nhifDeduction = nhifDeductions[i].deduction;
            break;
        }
    }

    // Calculate NSSF contribution (both employee and employer)
    let nssfEmployeeContribution = 0;
    let nssfEmployerContribution = 0;

    if (grossSalary <= nssfRates.tier1.max) {
        nssfEmployeeContribution = (grossSalary * nssfRates.tier1.employeeRate) / 100;
        nssfEmployerContribution = (grossSalary * nssfRates.tier1.employerRate) / 100;
    } else {
        const tier1Contribution = (nssfRates.tier1.max * nssfRates.tier1.employeeRate) / 100;
        const tier2Contribution = ((grossSalary - nssfRates.tier1.max) * nssfRates.tier2.employeeRate) / 100;
        nssfEmployeeContribution = tier1Contribution + tier2Contribution;

        nssfEmployerContribution = (grossSalary * nssfRates.tier1.employerRate) / 100;
    }

    // Calculate net salary
    const deductions = paye + nhifDeduction + nssfEmployeeContribution;
    const netSalary = grossSalary - deductions;

    // Prepare and return the salary breakdown
    const salaryBreakdown = {
        grossSalary: grossSalary,
        paye: paye.toFixed(2),
        nhifDeduction: nhifDeduction,
        nssfEmployeeContribution: nssfEmployeeContribution.toFixed(2),
        nssfEmployerContribution: nssfEmployerContribution.toFixed(2),
        netSalary: netSalary.toFixed(2)
    };

    return salaryBreakdown;
}

// Example usage:
const basicSalary = 60000;
const benefits = 10000;

const salaryDetails = calculateNetSalary(basicSalary, benefits);
console.log(salaryDetails);