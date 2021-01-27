@Test
Feature: Verify Username and Password

    Scenario: Add Remove Elements
        Given I am on The Internet search page
        And I click on Form Authentication
        When user enter "tomsmith" and "SuperSecretPassword!"
        Then success message is displayed