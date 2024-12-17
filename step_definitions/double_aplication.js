const { I } = inject();
const { expect} = require('chai');
const { testPayload } = require('../src/Payload');
const { testDataPayload2 } = require('../src/Payload2');
//const { testPayload2 } = require('../src/payload2');

let refId;
let token;
let custId;
let response;
let pin; // Variabel untuk menyimpan pin dari step pertama


//1 CREATE LOAN 
Given('I want to hit API loans', async () => {
    const endpoint = '/api/v1/loans' ;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic bW9iaWxlLWFwcDpzYTkyM25kczgyYng3bnY=',
        'Accept': 'application/json',   
    };
    
When('I send post request loans', async () => {
     // Generate payload
     const resolvedPayload = await testPayload();

     // Log untuk memastikan payload benar
     console.log('Payload for first request:', resolvedPayload);

     // Simpan pin yang dihasilkan ke variabel global
     pin = resolvedPayload.pin;

     response = await I.sendPostRequest(endpoint, resolvedPayload, headers);

     // Simpan data respons
     refId = response.data.id;
     token = response.data.token;
 });
//     // Await the testDataPayload to resolve
//     const resolvedPayload = await testPayload;

//     response = await I.sendPostRequest(endpoint, resolvedPayload, headers);
    
//     refId = response.data.id;
//     token = response.data.token;
// }); 

Then('I get response data loans', async () => {
    console.log('Ref ID:', refId);
    console.log('Token:', token);
    console.log('Pin:', pin); // Pastikan pin terlihat di log
    expect(response.status).to.be.within(200, 299);
});
});
//     console.log(refId);
//     console.log(token);
//     expect(response.status).to.be.within(200, 299);
// });
// });


//2 CREATE LOAN WITH SAME ID
Given('I want to hit API loans with same ID', async () => {
    const endpoint = '/api/v1/loans' ;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic bW9iaWxlLWFwcDpzYTkyM25kczgyYng3bnY=',
        'Accept': 'application/json',   
    
};

When('I send post request loans with same ID', async () => {
    // Generate payload dengan pin yang sama
    const resolvedPayload = await testPayload();

    // Ubah pin menjadi pin dari step pertama
    resolvedPayload.pin = pin;

    // Log untuk memastikan pin sama
    console.log('Payload for duplicate request:', resolvedPayload);

    response = await I.sendPostRequest(endpoint, resolvedPayload, headers);

    // Simpan data respons
    refId = response.data.id;
    token = response.data.token;
});
//     // Await the testDataPayload to resolve
//     const resolvedPayload = await Payload;

//     response = await I.sendPostRequest(endpoint, resolvedPayload, headers);
    
//     refId = response.data.id;
//     token = response.data.token;
// }); 

Then('Then I verify response for duplicate loan request', async () => {
    console.log('Ref ID:', refId);
        console.log('Token:', token);
        console.log('Pin:', pin); // Pastikan pin sama dengan step pertama
        expect(response.status).to.be.within(200, 299);
    });
});
//     console.log(refId);
//     console.log(token);
//     expect(response.status).to.be.within(200, 299);
// });
// });

// 3 Get User Profile
 Given('I want to hit API get user profle', async () => {
     const endpoint = '/api/v1/my/profile' ;
     const headers = {
        //  'Content-Type': 'application/json',
         'X-Auth-Token': `${token}`,
         'Authorization': 'Basic bW9iaWxlLWFwcDpzYTkyM25kczgyYng3bnY=',
     };
 When('I send get user profile', async () => {
     // Await the testDataPayload to resolve
    // const resolvedPayload2 = await testDataPayload2;

     const response = await I.sendGetRequest(endpoint, headers);

     custId = response.data.custId;
 });

 Then('I get response send user profile', async () => {

    console.log(custId);
     expect(response.status).to.be.within(200, 299);

 });
 });

 // 4 SEND DEVICE DATA
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


// 5 CHECK LOAN IN CRM
Given('I want to login CRM', () => {
    I.amOnPage('https://crm-prelive.tunaiku.com/CRM/Login/index')
    I.fillField("//input[@placeholder='Username']", 'qa_testing+99');
    I.fillField("//input[@placeholder='Password']", 'Tunaiku2024');
    I.wait(2);
    I.click("//button[normalize-space(text())='Sign In']");
});
When('I search cust id', () => {
    I.click({xpath: "/html/body/div[1]/div/aside/div/div[1]/a/span[2]"});
    I.wait(2);
    I.fillField("(//input[contains(@class,'form-control form-control-sm')])[2]", `${custId}`);
    // I.click({xpath: "(//button[contains(@class,'btn btn-sm')]//i)[1]"});
    I.pressKey('Enter');
    I.wait(5);
    I.scrollTo("//button[normalize-space(text())='Loans']")
    //I.executeScript(() => window.scrollTo(0, 600));
    I.see(`${refId}`);   
});
Then('I get status data loan', async () => {
    I.waitForElement("//a[normalize-space(text())='Double application']");
    //I.wait(2);
    I.click( "//a[normalize-space(text())='Double application']");
    I.wait(2);
// Mengambil nilai yang dipilih dari dropdown Application Status 
    let selectedOption = await I.grabValueFrom("//select[contains(.,'NewGoodAcceptedNormalRejectedBadPaid Back')]"); // Pilih ID yang sesuai untuk dropdown
// Menentukan data yang diharapkan
    const expectedValue = 'Rejected';  // Ganti dengan nilai yang diharapkan
// Membandingkan nilai yang dipilih dengan nilai yang diharapkan
    expect(selectedOption).to.equal(expectedValue, 'Dropdown value should be "Rejected"');
// Mengambil nilai yang dipilih dari dropdown Negative Decision Reason 
let selectedOption_2 = await I.grabValueFrom("//select[contains(.,'IncomeUnemployed/StudentEntrepreneurAgeDisposable incomeSecurity riskEmployer deficientScore cardCOVID RestructureLimitCustomer not reachedDocument not receivedDocument not validNo ID paymentDouble applicationOutside service areaBNPL LoansWrite OffExecutionEcommerce accountPaidout rate for long loansHTSS loansZero payerCo-Processing LoansSlik Auto RejectCapital ExposureDiscount customerOtherTimeoutInstallment Max Amount')]"); // Pilih ID yang sesuai untuk dropdown
// Menentukan data yang diharapkan
    const expectedValue_2 = '16';  // Ganti dengan nilai yang diharapkan
// Membandingkan nilai yang dipilih dengan nilai yang diharapkan
    expect(selectedOption_2).to.equal(expectedValue_2, 'Dropdown value should be "Double application"');
    I.saveScreenshot('Double_application.png');
    
});