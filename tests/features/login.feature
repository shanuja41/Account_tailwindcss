
Feature: Login functionality

  Scenario: Successful login

    Given the user is on the login page
    When the user enters valid email and password
    And clicks the login button
    Then the dashboard should be displayed