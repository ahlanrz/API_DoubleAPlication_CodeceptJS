function randomInt() {
    const randomNumberFront = Math.floor(Math.random() * (99 - 10 + 1) + 10);
    const randomNumberEnd = Math.floor(Math.random() * (9999 - 999 + 1) + 998);
    const randKtp = `${randomNumberFront}7601440391${randomNumberEnd}`;
    return randKtp;
  }
  
  async function testPayload(){
      try {
          const checkData = randomInt();
          return {
              addressInArea: true,
              income: {
                jobType: 'Entrepreneur',
                taxId: '99993515439999',
                employmentStatus: 'Permanent',
                employerName: 'PT.BANK JASA HiTUNG JAKARTA',
                yearSince: '2010',
                monthSince: '6',
                workPosition: 'Staff',
                employeeId: '2221112222',
                monthlyIncome: 1550000.00,
                previousIncome: 1150000.00,
              },
              lastName: 'Molang',
              mediasource: 'MobileApp',
              gender: 'Female',
              educationType: 'BachelorDegree',
              housing: {
                residentialType: 'Personal',
                electricityAndWaterCost: 500000,
                monthlyResidenceCost: 0,
                propertyType: 'House',
              },
              birthCityId: 354,
              spouse: {
                name: 'Devi',
                splitAssetAgreement: 'N',
                dateOfBirth: '1990-11-11',
                pin: checkData, // Use the generated checkData
              },
              emailAddress: 'cita.citata@amarbank.co.id',
              pin: checkData, // Use the generated checkData
              referralCode: '',
              residencePosition: 1,
              contactAddress: {
                contactAddressStatus: 'Y',
                rt: '02',
                province: 'DKI JAKARTA',
                city: 'KOTA ADM. JAKARTA UTARA',
                rw: '01',
                flatNumber: '12',
                street: 'Komplek pondok bahar blok D1 no 54, rt/rw 002/005,kel.pondok baharikec.karang tengah.Kota tangerang',
                district: 'District 33',
                postalCode: '10251',
                buildingNumber: '01',
                village: 'Village 33',
                compOrBuilding: ' ',
                buildingType: ' ',
              },
              birthDayProvincePosition: 6,
              mobilePhoneNumber: '+6287870828565',
              personalReference: {
                name: 'Ery Lubis',
                address: 'Gading',
                mobilePhone: '+6287870828565',
                homePhone: '+6287870828565',
              },
              emailIsOwn: 'Personal',
              domicileAddressObj: {
                rt: '02',
                province: 'DKI JAKARTA',
                city: 'KOTA ADM. JAKARTA UTARA',
                rw: '09',
                flatNumber: '29',
                street: 'street 33',
                district: 'district 33',
                postalCode: '10259',
                buildingNumber: '33',
                village: 'village 33',
                compOrBuilding: 'Building',
                buildingType: 'Kantor',
              },
              citizenship: 'Indonesian',
              developmentData: {
                triggerFrom: 'First Loan Form Application',
                versioncode: '2018081005',
                versionName: 'B05',
              },
          
              dateOfBirth: '1991-10-23',
              maritalStatusType: 'Married',
              loanPurposeType: 'Holiday',
              loanAmount: 30000000,
              birthDayCityPosition: 3,
              religion: 'Other',
              firstName: 'Alex',
              religionPosition: 6,
              addressProvincePosition: 6,
              dependants: 0,
              contactAddressCityPosition: 3,
              mothersName: 'Ida',
              loanPeriodInMonths: 20,
          
              account: {
                accountNumber: '7310252527',
                bankName: 'BCA',
                accountType: 'Personal',
              },
            };
      } catch (error) {
          console.error('error message: ',error)
      }
  };
  const data= testPayload();

  module.exports = {
    testPayload:data
  };
  