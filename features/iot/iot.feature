# language: en
@iot
<<<<<<< HEAD
Feature: 
=======
Feature:
>>>>>>> chore: copy v2 integ tests to v3 (#479)

  I want to use AWS IoT

  Scenario: Making a request
    Given I run the "listPolicies" operation
    Then the request should be successful
    And the value at "policies" should be a list

  Scenario: Error handling
    Given I run the "describeCertificate" operation with params:
    """
    { "certificateId": "fake_id" }
    """
    Then the error code should be "InvalidRequestException"
