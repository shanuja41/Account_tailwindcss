Feature: Login and Signup Functionality

  Background:
    Given the user is on the login page

  @success
  Scenario: Successful login
    When the user enters valid email and password
    And clicks the login button
    Then the dashboard should be displayed

  @validation
  Scenario: Login fails with empty email and password
    When the user leaves email and password empty
    And clicks the login button
    Then validation errors should be shown for email and password
    And the input fields should have error styling
    And the user should remain on the login page

  @validation
  Scenario: Login fails with invalid email format
    When the user enters invalid email "invalid-email" and valid password "password"
    And clicks the login button
    Then an error message "Please enter a valid email address" should be displayed
    And the user should remain on the login page

  @validation
  Scenario: Login fails with short password
    When the user enters valid email "admin@example.com" and short password "123"
    And clicks the login button
    Then the password error message should indicate minimum length requirement
    And the user should remain on the login page

  @validation
  Scenario: Login fails with incorrect credentials
    When the user enters email "wrong@example.com" and password "wrongpassword"
    And clicks the login button
    Then an error message about invalid credentials should be displayed
    And the user should remain on the login page

  @ui
  Scenario: Error messages should clear when typing
    When the user submits empty form
    Then validation errors should be visible
    When the user starts typing in the email field
    Then the email error message should disappear
    But the password error message should remain visible

  @ui
  Scenario: Password visibility toggle works
    When the user enters password "testpassword"
    And clicks the eye icon to show password
    Then the password should be visible as plain text
    When the user clicks the eye icon to hide password
    Then the password should be hidden

  @ui
  Scenario: Remember me checkbox functionality
    When the user checks the "Remember me" checkbox
    Then the checkbox should be checked
    When the user unchecks the "Remember me" checkbox
    Then the checkbox should be unchecked

  @ui
  Scenario: Forgot password link is present
    Then a "Forgot password?" link should be visible
    And it should be clickable

  @ui
  Scenario: Dark mode toggle works on login page
    When the user clicks the dark mode toggle button
    Then the page should switch to dark mode
    When the user clicks the dark mode toggle button again
    Then the page should switch back to light mode

  @demo
  Scenario: Demo credentials are displayed
    Then demo credentials should be visible on the login page
    And the demo email should be "admin@example.com"
    And the demo password should be "password"

  @accessibility
  Scenario: Form has proper ARIA attributes for accessibility
    Then the email input should have proper ARIA attributes
    And the password input should have proper ARIA attributes
    And error messages should be associated with their inputs

  # NEW: Password Mismatch Test Cases
  @signup @password-mismatch
  Scenario: Signup fails with mismatched passwords
    When the user switches to signup form
    And the user enters signup details with mismatched passwords
    And clicks the login button
    Then a password mismatch error should be displayed
    And the user should remain on the login page

  @signup @password-validation
  Scenario: Signup fails with short password
    When the user switches to signup form
    And the user enters signup details with short password
    And clicks the login button
    Then a short password error should be displayed
    And the user should remain on the login page

  @signup @success
  Scenario: Successful signup with valid data
    When the user switches to signup form
    And the user enters signup details with valid data
    And checks the terms agreement checkbox
    And clicks the login button
    Then the signup should be successful

  @signup @validation
  Scenario: Signup requires terms agreement
    When the user switches to signup form
    And the user enters signup details with valid data
    And clicks the login button
    Then an error message about terms agreement should be displayed
    And the user should remain on the login page