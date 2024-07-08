# Net Salary Calculator
This JavaScript program calculates the net salary based on the given basic salary and benefits, taking into account PAYE tax, NHIF deductions, and NSSF contributions (both employee and employer).

### Features
- Calculates monthly PAYE tax based on annual income brackets and rates.
- Determines NHIF deductions based on gross salary ranges.
- Computes NSSF contributions considering two-tiered rates for both employee and employer.
- Provides a detailed breakdown of gross salary, deductions, and net salary.

### Usage
To calculate the net salary:
1. Modify the `basicSalary` and `benefits` variables in the script according to your scenario.
2. Run the script in a JavaScript environment.
3. View the calculated salary breakdown in the console.

Example:
```javascript
const basicSalary = 60000;
const benefits = 10000;

const salaryDetails = calculateNetSalary(basicSalary, benefits);
console.log(salaryDetails);