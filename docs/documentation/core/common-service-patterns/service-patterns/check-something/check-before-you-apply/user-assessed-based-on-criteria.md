1.  [Home](/docs/core/contents)
2.	[Common service patterns](/docs/core/common-service-patterns/overview)
3.  [Check something](docs/documentation/core/common-service-patterns/service-patterns/check-something/overview)
4.  [Check before you apply](/docs/core/common-service-patterns/service-patterns/check-something/check-before-you-apply/overview)
5.  User assessed based on criteria

# User assessed based on criteria

## Overview

At this stage in the process, the user has entered a decision tree, which establishes their eligibility. 

## User needs

The user needs are:

* I need to know in a timely manner whether I am eligible or not
* I need to understand decision making rationale

## User flow

The user needs to quickly find out whether they are likely to be eligible. 

This will prepare them for their application and saves time for those users who are not eligible. 

## Considerations for the service

Where the result of the eligibility check can be automated, there are 2 scenarios: 

* if the user meets the eligibility criteria, they will be told they’re eligible
* if the user does not meet the eligibility criteria, they will be told they’re not eligible

When the check cannot be automated (because the service area needs to validate or verify whether the user is eligible manually), the user should be told when they will hear back. 

## Tech enabled interactions

Consider if the results will be automated or if it needs an assessment.
