1.  [Home](/docs/core/contents)
2.	[Common service patterns](/docs/core/common-service-patterns/overview)
3.  [Book something](/docs/core/common-service-patterns/service-patterns/book-something/overview.md)
4.  [Book onto an event that already exists](/docs/core/common-service-patterns/service-patterns/book-something/book-onto-an-event-that-already-exists/overview)
5.  Making a decision

# Making a decision
The user has found their nearest or most relevant event through a [‘check my nearest’](/docs/core/common-service-patterns/service-patterns/check-something/check-my-nearest/overview) scenario pattern. They now need to decide whether they want to attend the event based on location, cost and other factors. 

## User needs

The user needs are:

* I need to know enough information to make a booking
* I need to know what I need to complete a booking

## User flow

The user is viewing information about an event and deciding whether or not it’s suitable for them. This is based on location, cost and other factors. They can also see availability at this stage, such as whether or not it’s sold out.

Users who can’t find a suitable event because of the event’s date or location may look for the next best thing. They’ll do this by viewing alternative dates or events through filtering. 

## Service considerations

### Filtering

Within [‘check my nearest’](/docs/core/common-service-patterns/service-patterns/check-something/check-my-nearest/overview), make sure that filtering meets users' motivations and triggers for coming to that page.

Think about what they want to book. For example, an event that will happen at a specific time. Think about whether to display all events or encourage them to filter first.

### Access conditions

Make sure that the conditions for accessing the service and booking are clear at the start of the journey. For example, age criteria.

### Information to help the decision

Users will have their result from the [‘check my nearest’](/docs/core/common-service-patterns/service-patterns/check-something/check-my-nearest/overview) pattern.

Think about whether users know enough about the event to support their decision making including:

* event availability
* location
* time
* costs

Users should be left with a clear understanding of what is needed to book, such as:

* payment options
* number of steps
* time taken

If there are multiple payment options, make this clear at the start of the journey. 

## Tech-enabled considerations

Things to consider include:

* whether availability of the event or service can be automated to show real time
* if there’s an option for the service to stop taking bookings online when there’s no availability 
* if the booking platform remembers the desired booking selection – for example, similar to a shopping basket

## Research considerations

Things to consider include:

* the best way to display information on events
* when is it best for the user to filter results to make an informed decision
* how much information is enough to make an informed decision
