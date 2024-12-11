Feature: Double Aplication

  @test:test
  Scenario: Testing for checking API Loans
    Given I want to hit API loans
    When I send post request loans
    Then I get response data loans

  @test:test
  Scenario: Testing for checking API Loans with same ID
    Given I want to hit API loans with same ID
    When I send post request loans with same ID
    Then Then I verify response for duplicate loan request

  @test:test
  Scenario: I want to testing for checking API Get user profile
    Given I want to hit API get user profle
    When I send get user profile
    Then I get response send user profile

  @test:test
  Scenario: I want to testing for checking API Send Device Data
    Given I want to hit API send device data
    When I send post request send device data
    Then I get response send device data

  @test:test
  Scenario: I want to testing for checking loan in CRM
    Given I want to login CRM
    When I search cust id
    Then I get status data loan
