
Feature: Verify accessibility in the page

    Scenario: Verify accessibility on home and add/remove page
        Given I am on The Internet search page
        And user run accessability test on the current page named as "welcome page"
        When I click on Add Element
        And Add Element page should be displayed
        Then user run accessability test on the current page named as "Add/Remove Page"
