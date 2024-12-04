Feature: Double Aplication

  @test:test
  Scenario: Testing for checking API Loans
    Given I want to hit API loans
    When I send post request loans
    Then I get response data loans

  # @test:test
  # Scenario: Testing for checking API Loans using the same ID card number
  #   Given I want to hit the API with the same ID card number
  #   When I send post request loan
  #   Then I get response data loan

  # @test:test
  # # Scenario: I want to testing for checking API Send Device Data
  # #   Given I want to hit API send device data
  # #   When I send post request send device data
  # #   Then I get response send device data

  # @test:test
  # Scenario: I want to testing for checking loan in CRM
  #   Given I want to login CRM
  #   When I search ref id
  #   Then I get status data loan
