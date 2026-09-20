# Hotel Replicate

BUILD THIS WEBSITE AS A COMPLETE REPLICA OF THE REFERENCE WEBSITE

REFERENCE WEBSITE:
https://qcenthotels.com/

PRIMARY REFERENCE PAGE:
https://qcenthotels.com/qcent-woods-resort-spa-rishikesh-2/

ABSOLUTE REQUIREMENT

I want my website to feel like I am looking at the SAME WEBSITE EXPERIENCE as the reference website, not like a different generic hotel website.

When someone compares the reference website and my website side-by-side, the following must be substantially the same:

Overall page structure

Header structure

Navigation hierarchy

Our Hotels menu

State/location hierarchy

Hotel listing behavior

Individual hotel page structure

Section ordering

Image placement

Content density

Typography hierarchy

Buttons

CTA placement

Gallery behavior

Accommodation structure

Room selection behavior

Footer structure

Contact structure

Mobile navigation

Page-to-page navigation

Forms

Reservation/booking journey

All important interactions

Do NOT redesign the product into a generic Airbnb/Booking.com-style website.

The PRODUCT EXPERIENCE must remain faithful to the reference.

The visual styling can be modernized with a tasteful 2026 doodle/organic aesthetic, but the underlying website identity, architecture, information hierarchy and user flow must remain extremely close to the reference.

1. FIRST: STUDY THE COMPLETE REFERENCE WEBSITE

Before implementing, inspect the reference website thoroughly.

Do not inspect only the supplied hotel page.

Inspect:

Homepage

Header

Our Hotel menu

Every state/category inside Our Hotel

Every linked hotel/property

Marriage & Events

Q PG & Co-Living

Book Now

Reserve Now

Footer

Contact information

Search interaction

Mobile navigation

Any modal

Any form

Any booking/redirection behavior

Any room/accommodation interaction

Any gallery interaction

Create an internal route/interaction map before building.

Do not invent missing sections when they can be discovered from the reference.

2. REFERENCE WEBSITE STRUCTURE

The current reference navigation includes:

HOME

OUR HOTEL

Haryana

Masaga By Qcent

Hotel Sakura By Qcent Sec. 45

Hotel near Huda City Central Gurgaon

Madhuban Farm by Qcent Club

Uttrakhand

Pacific Inn 360 Degree Resort, Rishikesh

Qcent Woods Resort & Spa, Rishikesh

Qcent Bairagarh Resort, Rishikesh

KSR By Pacific Inn Hotels & Resorts, Rishikesh

The Aarambh Qcent Club, Mukteshwar

Pacific Inn Grand Vista, Mussoorie

Pacific Inn Devsthali Kedarnath

Pacific Inn Vistaar Hotels & Resorts, Paturi, Chamba

Rajasthan

Coming Soon

Himachal Pradesh

Koti Resort, Shimla

MARRIAGE & EVENTS

Q PG & CO-LIVING

BOOK NOW

RESERVE NOW

The website must reproduce this navigation concept with our own property data and branding.

3. OUR HOTEL MENU — MUST BE EXACTLY THIS TYPE OF EXPERIENCE

"OUR HOTEL" must NOT simply navigate to a generic hotels page.

It must open a hierarchical mega-menu/dropdown.

Desktop:

OUR HOTEL
↓
State
↓
Hotels belonging to that state

Example:

UTTRAKHAND
→ Rishikesh
→ Property A
→ Property B
→ Property C

→ Mukteshwar
→ Property

→ Mussoorie
→ Property

etc.

Each property is clickable.

Clicking it must open the property's individual page.

Mobile:

OUR HOTEL
↓
Accordion
↓
State
↓
Property

Do not lose the hierarchy on mobile.

4. DO NOT HARD-CODE PROPERTY PAGES

Every property must be database-driven.

Use:

/hotels/:slug

Examples:

/hotels/qcent-woods-resort-spa-rishikesh

/hotels/qcent-bairagarh-resort-rishikesh

/hotels/koti-resort-shimla

etc.

The SAME reusable HotelDetails component must render all properties.

Changing MongoDB property data must change the page automatically.

5. HOMEPAGE

The homepage must follow the reference site's overall visual hierarchy and hospitality presentation.

Do NOT turn it into a generic SaaS landing page.

Preserve:

Hero

Hotel/property discovery

Hospitality sections

Property promotion

Experiences

Events

Contact

Footer

Modernize only the visual treatment.

Use:

Premium photography

Elegant typography

Organic shapes

Subtle doodle lines

Hand-drawn decorative accents

Smooth scroll animations

Editorial layouts

Doodles should enhance the reference design, not replace it.

6. HEADER

Reproduce the reference header architecture.

Include:

Logo

Home

Our Hotel

Marriage & Events

Q PG & Co-Living

Book Now

Reserve Now

Also provide where appropriate:

Search

User/login

Wishlist

Desktop navigation must have the same hierarchy and behavior.

Mobile must have a hamburger menu.

Header should remain visually consistent throughout the website.

7. BOOK NOW

The reference website has a Book Now CTA.

Our implementation must have a REAL working booking journey.

Do NOT create a dead button.

Clicking Book Now should open our booking system.

Booking flow:

Book Now
↓
Select property
↓
Select check-in
↓
Select check-out
↓
Guests
↓
Rooms
↓
Available accommodation
↓
Select room
↓
Meal plan
↓
Guest details
↓
Price summary
↓
Payment
↓
Confirmation

8. RESERVE NOW

Reserve Now must also work.

Depending on the property configuration, it should either:

A. Open the booking engine

OR

B. Open a reservation/enquiry form.

Reservation form:

Property

Preferred date

Check-in

Check-out

Adults

Children

Rooms

Room preference

Name

Email

Phone

Message

Save the reservation request in MongoDB.

Show a proper confirmation state.

9. INDIVIDUAL HOTEL PAGE

The reference hotel page must be treated as the main template.

For example, the reference Qcent Woods page currently has:

Hotel title

Welcome text

About

Multi Cuisine Restaurant

Accommodation

Room categories

Book a Room

Accommodation Type

Amenities

Gallery

Contact/footer

This structure must be preserved as the foundation of our dynamic property template.

Do not randomly rearrange these sections.

10. HOTEL HERO

Hero must contain:

Large property image

Hotel name

Short tagline

Location

Primary CTA

Secondary CTA

The visual proportions should closely follow the reference.

Use authorized property photography.

Do NOT automatically replace the property's real images with random hotel stock images.

11. HOTEL ABOUT

Show:

ABOUT [PROPERTY NAME]

Include:

Main description

Location

Property concept

Nature/surroundings

Hospitality

Use a rich content field in MongoDB.

Support:

Paragraphs

Headings

Images

Links where required

12. RESTAURANT / DINING

Reproduce the restaurant section concept from the reference.

For Qcent Woods, the page explicitly presents a "Multi Cuisine Restaurant" section describing breakfast, lunch, dinner, world cuisine, grilling arrangements and surroundings.

Our database must support:

restaurants[]

Each restaurant:

Name

Description

Cuisine

Images

Timing

Seating

Menu

Features

If a hotel has no restaurant, hide the section.

13. ACCOMMODATION

Preserve the reference's accommodation hierarchy.

Example structure:

Choose Your Room Type

↓

Accommodations

↓

Room categories

↓

Choose Your Accommodation Type

↓

Room cards

Each room must contain:

Name

Images

Description

Room size

Bed type

Maximum occupancy

Amenities

Price

Meal plans

Availability

Book Room

The reference currently separates "Accommodations" and "Choose Your Accommodation Type" and shows room categories such as Deluxe Woods Cottage and Luxury Woods Cottage.

Our implementation must preserve this concept.

14. ROOM DETAIL

Clicking a room must open a detailed room page/modal.

Route:

/hotels/:hotelSlug/rooms/:roomSlug

Show:

Gallery

Room title

Description

Bed

Size

Occupancy

Amenities

Price

Meal plans

Cancellation policy

Availability

Book button

15. BOOK A ROOM

Every "Book a Room" button must be functional.

Do not navigate to nowhere.

Click:

BOOK A ROOM

↓

Booking widget

↓

Dates

↓

Guests

↓

Availability

↓

Room

↓

Guest details

↓

Payment

↓

Confirmation

16. AMENITIES

The reference property displays a dedicated Hotel Amenities section with items including:

Room Service

Wifi & Internet

Reception

Breakfast

Parking

Pool

Our system must support arbitrary amenities per property.

Use:

amenities[]

Each amenity:

Icon

Name

Description

Category

Render dynamically.

17. GALLERY

Create a gallery matching the reference's visual importance.

Support:

Grid

Masonry

Fullscreen

Lightbox

Previous

Next

Close

Mobile swipe

Property gallery:

gallery[]

Room gallery:

room.images[]

Restaurant gallery:

restaurant.images[]

Event gallery:

event.images[]

Never mix images between properties.

18. LOCATION

Property page should include:

Address

Map

Directions

Nearby attractions

Distance

Nearby attractions must be property-specific.

19. CONTACT

Reproduce the contact/footer architecture.

Hotel contact:

Address

Phone

Email

WhatsApp

Contact form

Map

Contact form:

Name
Email
Phone
Message

Submit to backend.

20. FOOTER

The reference footer contains:

Our Hotel hierarchy

Marriage & Events

Q PG & Co-Living

Contact information

Social links

Copyright

Our footer must preserve the same information hierarchy.

Do NOT replace it with a generic SaaS footer.

All links must work.

21. MARRIAGE & EVENTS

Clicking:

MARRIAGE & EVENTS

must open a dedicated section/page.

Do not create a placeholder.

Include all event-related content available from the reference structure.

Support:

Weddings

Marriage functions

Corporate events

Meetings

Conferences

Venue information

Gallery

Packages

Enquiry

Enquiry form:

Name
Phone
Email
Event type
Event date
Guests
Property
Budget
Message

Save to MongoDB.

22. Q PG & CO-LIVING

Clicking:

Q PG & CO-LIVING

must open a dedicated functioning section.

Include:

Properties

Locations

Rooms

Amenities

Pricing

Gallery

Contact

Enquiry

Do not simply create a heading saying "Coming Soon."

23. SEARCH

Implement a proper search.

Search:

Destination
Property
Check-in
Check-out
Guests
Rooms

Results must be database-driven.

Filters:

State

City

Price

Rating

Amenities

Property type

Room type

Sorting:

Recommended

Price

Rating

24. HOTEL SEARCH / LOCATION FLOW

When user navigates:

Our Hotel
→ State
→ Hotel

they must immediately reach that property's actual page.

When user searches:

Rishikesh

show Rishikesh properties.

When user selects:

Uttarakhand

show Uttarakhand properties.

Use URL query parameters where appropriate.

Example:

/search?state=uttarakhand

/search?city=rishikesh

25. BOOKING ENGINE

Implement actual backend availability logic.

For selected:

Property
Room
Check-in
Check-out
Number of rooms

calculate:

Available inventory
Booked inventory
Remaining inventory

Prevent double booking.

Backend must be the source of truth.

26. DATE EDGE CASES

Handle:

Check-out before check-in

Same-day check-in/out

Past dates

Fully booked dates

Partial availability

Multiple rooms

Multiple guests

Room capacity exceeded

Cancelled booking inventory

Overlapping bookings

Invalid date ranges

Never allow invalid booking.

27. PRICING EDGE CASES

Calculate on backend:

Base room price
× nights
× rooms

Meal plan

Taxes

Service fee

Discount

=

Final total

Frontend must never determine the final authoritative price.

28. BOOKING STATUS

Use:

Pending
Payment Processing
Confirmed
Cancelled
Checked In
Checked Out
Refunded
Failed

29. USER ACCOUNT

Implement:

/login
/register
/profile
/my-bookings
/wishlist

Users can:

Login

Register

View profile

View bookings

Cancel booking

Download invoice

Save hotels

Review completed stays

30. AUTHENTICATION

Use:

JWT
bcrypt
HTTP-only cookies

Roles:

USER
HOST
ADMIN

Protect routes.

31. HOST SYSTEM

Host dashboard:

/host/dashboard

Host can:

Add property

Edit property

Add rooms

Edit rooms

Manage prices

Manage inventory

See bookings

See revenue

Manage availability

32. ADMIN

Admin:

/admin

Manage:

Hotels

Rooms

Users

Hosts

Bookings

Reviews

Events

Enquiries

Offers

Q PG properties

33. DATABASE

Use MongoDB + Mongoose.

Models:

User
Property
Room
Booking
Review
Wishlist
Restaurant
Experience
NearbyAttraction
Event
EventEnquiry
ReservationRequest
ContactMessage
PgProperty
PgRoom
Offer

34. PROPERTY DATA STRUCTURE

Every property must support:

name
slug
state
city
location
address
heroImage
gallery
description
highlights
restaurants
rooms
amenities
experiences
nearbyAttractions
policies
contact
coordinates
seo
status
hostId

35. ASSET SYSTEM — EXTREMELY IMPORTANT

DO NOT use random generic images for the flagship property.

The property imagery must be controlled by property data.

For each property:

heroImage
gallery[]
logo
roomImages[]
restaurantImages[]
experienceImages[]

For each room:

images[]

For events:

gallery[]

For Q PG:

gallery[]

If authorized reference assets are supplied or available for this project, map them to the corresponding sections.

Do NOT randomly mix images.

Do NOT put the same generic hotel image everywhere.

Do NOT use AI-generated hotel photography as a silent replacement.

If an asset is missing, preserve the correct layout and make the asset easily replaceable from the database/CMS.

36. VISUAL FIDELITY

The website must NOT look like a generic Lovable-generated website.

Avoid:

Generic SaaS hero

Generic gradient backgrounds

Random purple/blue gradients

Excessive glassmorphism

Generic dashboard cards everywhere

Random stock photography

Generic hotel card templates

Excessive rounded corners

Excessive animations

Instead preserve the visual personality of the reference.

Use:

Same overall spacing philosophy

Similar content density

Similar section hierarchy

Similar image prominence

Similar CTA hierarchy

Similar navigation proportions

Similar footer structure

Then add tasteful modern doodle/hand-drawn accents.

37. DOODLE DESIGN

Doodle style is ONLY a visual enhancement.

Use:

Hand-drawn arrows

Small stars

Curved lines

Organic outlines

Travel sketches

Mountain/river/nature motifs

Handwritten decorative labels

Do NOT let doodles change the layout.

Do NOT make the website childish.

The reference website must still be recognizable underneath the modern styling.

38. RESPONSIVE FIDELITY

Desktop must preserve the reference's hierarchy.

Tablet must reorganize naturally.

Mobile must preserve the same journey.

Mobile navigation:

Hamburger
→ Our Hotel
→ State accordion
→ Hotel

Mobile hotel page:

Hero
→ About
→ Restaurant
→ Accommodation
→ Rooms
→ Amenities
→ Gallery
→ Contact
→ Booking CTA

Use sticky booking CTA on mobile where appropriate.

39. EVERY CLICKABLE ELEMENT MUST WORK

Perform a complete clickable-element audit.

Test:

Logo
Home
Our Hotel
Every state
Every hotel
Marriage & Events
Q PG & Co-Living
Book Now
Reserve Now
Hotel cards
Room cards
Book a Room
Gallery
Gallery next/previous
Contact
Phone
Email
WhatsApp
Map
Forms
Login
Register
Wishlist
Profile
My Bookings
Cancel
Invoice
Reviews
Footer links

There must be NO dead buttons.

There must be NO "#" placeholder links.

There must be NO fake success messages.

40. FORMS

Every form must have:

Validation

Loading state

Error state

Success state

Backend submission

MongoDB persistence

Forms include:

Login
Register
Contact
Reservation
Booking
Event enquiry
Q PG enquiry
Review
Host property creation
Host room creation

41. LOADING STATES

Every async page:

Skeleton loader.

Every form:

Submitting state.

Every failed request:

Useful error message + retry.

42. EMPTY STATES

Examples:

No hotels found
No rooms available
No bookings
No wishlist
No reviews
No events
No Q PG properties

Create polished empty states.

43. SEO

Dynamic SEO per hotel.

Generate:

title
description
OG image
canonical URL

Use semantic HTML.

44. PERFORMANCE

Implement:

Lazy-loaded images
Responsive images
Code splitting
Optimized API requests
MongoDB indexes
Efficient React rendering

45. SECURITY

Implement:

Password hashing
JWT validation
Role authorization
Input validation
CORS
Secure cookies
Rate limiting where appropriate
MongoDB sanitization
Server-side pricing
Server-side availability

46. ROUTES

Implement all required routes:

/
/hotels
/hotels/:slug
/hotels/:hotelSlug/rooms/:roomSlug
/search
/destinations
/destinations/:slug
/events
/events/weddings
/events/corporate
/q-pg-coliving
/q-pg-coliving/:slug
/book
/reserve
/booking/:hotelSlug
/booking/success/:bookingId
/login
/register
/forgot-password
/reset-password
/profile
/wishlist
/my-bookings
/my-bookings/:bookingId
/host/dashboard
/host/properties
/host/properties/new
/host/properties/:id/edit
/host/properties/:propertyId/rooms
/host/bookings
/admin
/admin/users
/admin/hotels
/admin/rooms
/admin/bookings
/admin/events
/admin/enquiries

47. SEED DATA

Create enough realistic data to demonstrate the full architecture.

Minimum:

8 properties
Multiple states
20+ rooms
Multiple room categories
Restaurants
Amenities
Experiences
Nearby attractions
Reviews
Offers
Events
Q PG properties
Users
Host
Admin

The main Rishikesh property should demonstrate the full hotel-page experience.

48. DO NOT CHANGE THE INFORMATION ARCHITECTURE JUST TO MAKE IT "BETTER"

This is a critical instruction.

Do not decide:

"Airbnb-style search would be better."

Do not decide:

"Let's make a modern SaaS navbar."

Do not decide:

"Let's simplify the hotel page."

Do not remove sections because they appear unnecessary.

The objective is REFERENCE FIDELITY.

If the reference has a particular section/order/navigation behavior, reproduce that behavior.

49. DO NOT INVENT RANDOM FEATURES

Do not add unrelated:

Marketplace

Social feed

AI chatbot

Random loyalty system

Random subscription

Generic SaaS analytics

Unrelated features

Only add functionality necessary to make the reference experience fully functional and scalable.

50. CONTENT FIDELITY

For the authorized flagship/reference property, preserve the same type and density of information:

Welcome

About

Restaurant

Accommodation

Room categories

Amenities

Gallery

Contact

Booking

The reference page currently contains these sections and uses room/accommodation categories plus a dedicated amenities section.

Use our own authorized property copy/assets where required.

Do not fill the page with meaningless lorem ipsum.

51. FINAL USER JOURNEY TEST

The following MUST work end-to-end:

TEST A:

Home
→ Our Hotel
→ Uttarakhand
→ Rishikesh property
→ Hotel page
→ Gallery
→ Accommodation
→ Room
→ Book Room
→ Dates
→ Guests
→ Guest details
→ Price
→ Payment
→ Confirmation
→ My Bookings

TEST B:

Home
→ Our Hotel
→ Haryana
→ Property
→ Book Now
→ Booking

TEST C:

Home
→ Marriage & Events
→ Wedding
→ Enquiry
→ Submit
→ Success

TEST D:

Home
→ Q PG & Co-Living
→ Property
→ Room
→ Enquiry
→ Success

TEST E:

Host
→ Login
→ Dashboard
→ Add Property
→ Add Room
→ Inventory
→ Booking
→ Manage Booking

TEST F:

User
→ Login
→ Wishlist
→ Hotel
→ Book
→ My Bookings
→ Review

52. FINAL VISUAL TEST

After implementation, compare the website against the reference.

Check:

Header height
Navigation positioning
Dropdown behavior
Hero proportions
Image sizes
Section ordering
Spacing
Typography hierarchy
Button placement
Room section
Amenities
Gallery
Footer
Mobile menu
Mobile spacing
CTA placement

If the result looks like a completely different website, fix it.

The final result should make the owner immediately recognize:

"This is my website based on the same Qcent website structure."

53. FINAL IMPLEMENTATION RULE

DO NOT STOP AT THE HOMEPAGE.

DO NOT STOP AT THE HOTEL PAGE.

DO NOT CREATE A STATIC MOCKUP.

BUILD:

Frontend
+
Backend
+
MongoDB
+
Authentication
+
Property CMS
+
Room CMS
+
Availability
+
Booking
+
Reservation
+
Events
+
Q PG / Co-Living
+
User Account
+
Host Dashboard
+
Admin
+
Responsive UI
+
All routes
+
All forms
+
All interactions

Everything must be connected.

54. FINAL COMMAND

Build the entire application now.

First inspect the reference website and create the complete route/interaction architecture.

Then implement the reusable data model.

Then implement backend APIs.

Then implement frontend.

Then implement booking.

Then implement dashboards.

Then perform a complete clickable-element audit.

Then perform mobile testing.

Then fix every broken route, dead button, missing state, missing loading state and inconsistent component.

DO NOT tell me that something is "out of scope".

If a feature is visible or implied by the reference website's navigation/user journey, implement the corresponding working version.

The final website must preserve the reference's identity, structure, navigation and user experience while using our own authorized branding/content/assets and the modern doodle visual treatment.

The result must be a REAL, WORKING, FULL-STACK WEBSITE — NOT A DESIGN MOCKUP.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1c3562b6-1796-4d33-8e96-6b16ca93ff4b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
