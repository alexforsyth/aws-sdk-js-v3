# language: en
@apigateway
<<<<<<< HEAD
Feature: 
=======
Feature:
>>>>>>> chore: copy v2 integ tests to v3 (#479)

  I want to use Amazon API Gateway

  Scenario: Making a request
    Given I run the "getRestApis" operation
    Then the request should be successful
    And the value at "items" should be a list

  Scenario: Error handling
    Given I run the "getRestApi" operation with params:
    """
    { "restApiId": "fake_id" }
    """
    Then the error code should be "NotFoundException"
