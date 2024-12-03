const { I } = inject();
const { expect} = require('chai');
const { testPayload } = require('../src/payload');
const { testDataPayload2 } = require('../src/payload2');
// const { testPayload2 } = require('../src/payload2');

let refId;
let token;
let response;

//1 CREATE LOAN 
Given('I want to hit API loans', async () => {
    const endpoint = '/api/v1/loans' ;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic bW9iaWxlLWFwcDpzYTkyM25kczgyYng3bnY=',
        'Accept': 'application/json',   
    
};
When('I send post request loans', async () => {
    // Await the testDataPayload to resolve
    const resolvedPayload = await testPayload;

    response = await I.sendPostRequest(endpoint, resolvedPayload, headers);
    
    refId = response.data.id;
    token = response.data.token;
}); 

Then('I get response data loans', async () => {
    console.log(refId);
    console.log(token);
    expect(response.status).to.be.within(200, 299);
});
});

// 2 SEND DEVICE DATA
Given('I want to hit API send device data', async () => {
    const endpoint = '/api/v1/my/device' ;
    const headers = {
        'Content-Type': 'application/json',
        'X-Auth-Token': `${token}`,
        'Authorization': 'Basic bW9iaWxlLWFwcDpzYTkyM25kczgyYng3bnY=',
    };
When('I send post request send device data', async () => {
    // Await the testDataPayload to resolve
    const resolvedPayload2 = await testDataPayload2;

    const response = await I.sendPostRequest(endpoint, resolvedPayload2, headers);

});

Then('I get response send device data', async () => {

    expect(response.status).to.be.within(200, 299);

});
});

// 3 CHECK LOAN IN CRM
Given('I want to login CRM', () => {
    I.amOnPage('https://crm-prelive.tunaiku.com/CRM/Login/index')
    I.fillField("//input[@placeholder='Username']", 'qa_testing+99');
    I.fillField("//input[@placeholder='Password']", 'Tunaiku2024');
    I.wait(2);
    I.click("//button[normalize-space(text())='Sign In']");
});
When('I search ref id', () => {
    I.fillField("//input[@placeholder='Ref no']", `${refId}`);
    I.click({xpath: "(//button[contains(@class,'btn btn-sm')]//i)[1]"});
    I.wait(5);
    I.see(`${refId}`);   
});
Then('I get application status loan', async () => {
    
// Mengambil nilai yang dipilih dari dropdown Application Status 
    let selectedOption = await I.grabValueFrom({xpath:"//select[contains(.,'NewGoodAcceptedNormalRejectedBadPaid Back')]"}); // Pilih ID yang sesuai untuk dropdown
// Menentukan data yang diharapkan
    const expectedValue = 'Rejected';  // Ganti dengan nilai yang diharapkan
// Membandingkan nilai yang dipilih dengan nilai yang diharapkan
    expect(selectedOption).to.equal(expectedValue, 'Dropdown value should be "Rejected"');
// Mengambil nilai yang dipilih dari dropdown Negative Decision Reason 
let selectedOption_2 = await I.grabValueFrom({xpath:"//select[contains(.,'IncomeUnemployed/StudentEntrepreneurAgeDisposable incomeSecurity riskEmployer deficientScore cardCOVID RestructureLimitCustomer not reachedDocument not receivedDocument not validNo ID paymentDouble applicationOutside service areaBNPL LoansWrite OffExecutionEcommerce accountPaidout rate for long loansHTSS loansZero payerCo-Processing LoansSlik Auto RejectCapital ExposureDiscount customerOtherTimeoutInstallment Max Amount')]"}); // Pilih ID yang sesuai untuk dropdown
// Menentukan data yang diharapkan
    const expectedValue_2 = '3';  // Ganti dengan nilai yang diharapkan
// Membandingkan nilai yang dipilih dengan nilai yang diharapkan
    expect(selectedOption_2).to.equal(expectedValue_2, 'Dropdown value should be "Unemployed/Student"');
    
});