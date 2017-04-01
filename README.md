# animalalerts
Animal Alerts is designed to be used by animal welfare nonprofits, like the Humane Society of the United States, as a way to alert animal advocates to legislation, actions, or petitions that affect animals.  

Advocates (users) can sign up and choose from a number of interest categories (e.g. Wildlife, Farm Animals, or Domestic Pets).  When they log in, they will see their elected officials and contact information based on the address they provided at signup, and alerts based on the category(ies) they have signed up for.  Currently, the app displays a user's state senator(s) and representative(s), but may be updated in the future to include federal legislators.  They can also edit their account using the form at the bottom of the user page.  Any fields left blank will remain the same, any fields that are updated will change accordingly.

Admins are the only ones that are allowed to send alerts.  New alerts can be sent to a single interest category or multiple interest categories. Admins can also see a list of all the alerts that have been sent (an Outbox), and can add or remove Admins from the list of existing users.

The database is currently seeded with two users and one admin.  Logins are based on phone numbers, but I decided not to force 10 digits simply to make the app easier to navigate for demo purposes.
  Joe is a user, signed up to receive Wildlife alerts.  Login is 123, password is joe.
  Bill is a user, signed up to receive Domestic Pets alerts.  Login is 456, password is bill.
  Susie is the admin.  Login is 789, password is admin.


**** Please note that users must provide a real address in order for the legislator lookup functionality to work properly. Future updates may include automatic validation.  For now, just play nice and use a real address. ****

Additionally, the phone numbers are used as the userID, so they must be unique to each user.  I did that intentionally because I intend to hook this up to Twilio in the future to allow the alerts to be sent via text messages.  For now, you can use a fake number since the alerts aren't actually sent out as texts.
