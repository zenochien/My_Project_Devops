# Hairlie Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.0.5
[2021-11-08]

### Features

- **autoCancel**: [`HRL-1304`](https://c2cdoc.atlassian.net/browse/HRL-1304) Add CANCELED_AUTO status ([`8120430`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8120430753471f54f7611d423d83c3befa0c98d5))
- **customer**: [`HRL-1238`](https://c2cdoc.atlassian.net/browse/HRL-1238) Add CUSTOMER role for notifications API ([`1b61e8f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1b61e8f573e10b312254521347dec80888e78dd4))
- **monthView**: [`HRL-1047`](https://c2cdoc.atlassian.net/browse/HRL-1047) Add getStylistScheduleMonthView API ([`a4fb154`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a4fb154d7058b91695676444b5fefc1ffdb349f8))
- **monthView**: [`HRL-1047`](https://c2cdoc.atlassian.net/browse/HRL-1047) Add salonScheduleStartEnd for getStylistScheduleMonthView API ([`d8f33cf`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d8f33cfe6c57110af25e2662350d72b40803a132))
- **monthView**: [`HRL-1047`](https://c2cdoc.atlassian.net/browse/HRL-1047) Remove scheduleDailies in getStylistScheduleMonthView API ([`e031003`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e031003e1cd49885729e9057d32c18f08468299b))
- **stylist**: [`HRL-1253`](https://c2cdoc.atlassian.net/browse/HRL-1253) Add isForceUpdate for assignMenus API ([`1bc4866`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1bc48660bbb7c3f9d2e51a84a2df7b192ec5372e))
- **stylist**: [`HRL-1312`](https://c2cdoc.atlassian.net/browse/HRL-1312) Add role stylist for getStylistUnavailableDaysOfMonth API ([`1cebdfe`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1cebdfe480217d23043c86ca86bd89d59338636f))

### Fixes

- **CB**: [`HRL-1328`](https://c2cdoc.atlassian.net/browse/HRL-1328) Update email in CB ([`d3e02ca`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d3e02ca5a133a9e752e62313313a738e00c8edbc))
- **confirmBooking**: [`HRL-1288`](https://c2cdoc.atlassian.net/browse/HRL-1288) Fix logAction ([`c60b384`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c60b3842fe76c13550c0df34228e607a4f42d0d9))
- **email**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Do not use oneOf with secretKey ([`37d5cea`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/37d5ceaf12a093ce981e9a9d8875b39bb5c695b8))
- **notification**: [`HRL-1233`](https://c2cdoc.atlassian.net/browse/HRL-1233) Fix customerProfileImage ([`10a08d0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/10a08d0a1189f6b7272d124d3878e6992c6c4d2a))
- **notification**: [`HRL-1233`](https://c2cdoc.atlassian.net/browse/HRL-1233) Public some param ([`29e1f35`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/29e1f3568bea15baf8224f1a1966d7d98d6be55e))
- **notification**: [`HRL-1233`](https://c2cdoc.atlassian.net/browse/HRL-1233) Update notification data ([`891c6d0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/891c6d0c2c95251654794fe50ed6457e76fdc031))
- **notification**: Edit in app notification content ([`f5c0654`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f5c06541828ad3239df00c47c0fe19176df1b1c3))
- **pushNotification**: [`HRL-1303`](https://c2cdoc.atlassian.net/browse/HRL-1303) Add sendTestNotification API ([`0e5da93`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0e5da93a292d31e34b7bf354ced9fa711b94936c))
- **pushNotification**: [`HRL-1303`](https://c2cdoc.atlassian.net/browse/HRL-1303) Put title to body ([`a9f9779`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a9f97794a8dad5380652ca7cb829aa626fc943d8))
- **stylist**: [`HRL-1255`](https://c2cdoc.atlassian.net/browse/HRL-1255) Can't deselect all menu when edited my menu ([`82194ab`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/82194abd65c3bdc7845b5002c1890799e94f7305))
- **stylist**: [`HRL-1255`](https://c2cdoc.atlassian.net/browse/HRL-1255) Stringify error for UnassignMenuError ([`2ea2d8d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/2ea2d8de64e3e48c8a99e2434e344b469d8959bf))
- **stylist**: [`HRL-1262`](https://c2cdoc.atlassian.net/browse/HRL-1262) Handle getPostList API for stylist role ([`ccf14f3`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ccf14f32838b34090935b6f6c0ea3f253f51dfb4))
- **stylist**: [`HRL-1262`](https://c2cdoc.atlassian.net/browse/HRL-1262) Stylist can get UNPUBLISHED posts ([`08bbe5b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/08bbe5ba5144651cf66629e7c823f909fe72814f))

### Others

- docs **logout**: [`HRL-1339`](https://c2cdoc.atlassian.net/browse/HRL-1339) Add apidoc for Parseplatform's logout ([`44c55fe`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/44c55fef8fe8dbe6f62d91dc1b1f93551ffaa3d4))
- docs **stylist**: [`HRL-1312`](https://c2cdoc.atlassian.net/browse/HRL-1312) Update apidoc for getStylistUnavailableDaysOfMonth API ([`7f3566f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7f3566fc0cec4ee44b31102a6b460ca8deb8858b))
- Merge commit '199e3cdcc2447730880efabd087bc0cc10e5aeb9' into develop ([`0595ca7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0595ca7076b52888ff72c95401848f8d4893c10c))
- Merge commit '89758c7a8c7aeb6dc9bb27ceed1d0c1c894e616a' into develop ([`3bee209`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3bee2098a0076928b4345d694cb7148b20f72ada))
- Merge commit 'fbb3a0423752554ee8f1cf83e2df03961d2519a3' into release/1.0.5 ([`e5dc270`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e5dc2706026de847d89aa161d78f90d81f50c024))

## v1.0.4
[2021-11-08]

### Features

- **autoCancel**: [`HRL-1304`](https://c2cdoc.atlassian.net/browse/HRL-1304) Add CANCELED_AUTO status ([`29a44db`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/29a44dbc57625c86d29b55209e7e04eb1361b2fb))
- **csv**: [`HRL-1267`](https://c2cdoc.atlassian.net/browse/HRL-1267) Salon can export booking to CSV ([`#385`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/385))
- **deleteCustomer**: [`HRL-1277`](https://c2cdoc.atlassian.net/browse/HRL-1277) Add deleteCustomer script ([`b34815b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b34815b86f71d1ff119a87e0afab43bb95f71a28))
- **notification**: [`HRL-1233`](https://c2cdoc.atlassian.net/browse/HRL-1233) Update notification's content ([`#377`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/377))
- **stylist**: [`HRL-1227`](https://c2cdoc.atlassian.net/browse/HRL-1227) Allow stylist getBookingList ([`2cec4d1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/2cec4d1152906841a5fface4d27b57e261687c21))
- Feature/[`HRL-1142`](https://c2cdoc.atlassian.net/browse/HRL-1142) ([`#384`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/384))
- Feature/[`HRL-1142`](https://c2cdoc.atlassian.net/browse/HRL-1142) ([`#382`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/382))

### Fixes

- **card**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Fix delete card bug ([`5e3e2af`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5e3e2af95e96eca6741b1984083640d158bd6c3c))
- **csv**: [`HRL-1267`](https://c2cdoc.atlassian.net/browse/HRL-1267) Fix format date time ([`fe3dbd3`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fe3dbd303cf4408200e8b368f4aea8cf31145724))
- **csv**: [`HRL-1267`](https://c2cdoc.atlassian.net/browse/HRL-1267) Fix format date time ([`b442cd8`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b442cd8e74ea8e320f3c900ea5caad0ddd01c50d))
- **csv**: [`HRL-1267`](https://c2cdoc.atlassian.net/browse/HRL-1267) Fix format date time ([`5ea4774`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5ea47743eea6da23e53bd1a68848daa52c383eb3))
- **csv**: [`HRL-1314`](https://c2cdoc.atlassian.net/browse/HRL-1314) Fix payment date ([`199e3cd`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/199e3cdcc2447730880efabd087bc0cc10e5aeb9))
- **csv**: [`HRL-1314`](https://c2cdoc.atlassian.net/browse/HRL-1314) Update JP text for csv file ([`fbb3a04`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fbb3a0423752554ee8f1cf83e2df03961d2519a3))
- **getStylistUnavailableDaysOfMonth**: [`HRL-1142`](https://c2cdoc.atlassian.net/browse/HRL-1142) Add comments ([`78c497a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/78c497a6c77bd2f823dc225395f1f78c5d990b06))
- **getStylistUnavailableDaysOfMonth**: [`HRL-1142`](https://c2cdoc.atlassian.net/browse/HRL-1142) Not show unavailable days of current month in some case ([`a9cb1c5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a9cb1c5183c74a0a64e4c3b55664a88e46861bb7))
- **getStylistUnavailableDaysOfMonth**: [`HRL-1142`](https://c2cdoc.atlassian.net/browse/HRL-1142) Not show unavailable days of current month in some case ([`3894fe5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3894fe5a99b39590478c5f69420a6429de26e894))
- **getStylistUnavailableDaysOfMonth**: [`HRL-1142`](https://c2cdoc.atlassian.net/browse/HRL-1142) Refactor and add unit test ([`28d4f2d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/28d4f2d53d09fd412a9c79e95962940608443526))
- **paymentStatus**: [`HRL-1304`](https://c2cdoc.atlassian.net/browse/HRL-1304) Update paymentStatus to CANCELD for bookingStatus CANCELED_ ([`89758c7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/89758c7a8c7aeb6dc9bb27ceed1d0c1c894e616a))
- **prefecture**: [`HRL-1205`](https://c2cdoc.atlassian.net/browse/HRL-1205) Remove createdAt in result's API ([`#375`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/375))
- **stylist**: [`HRL-1229`](https://c2cdoc.atlassian.net/browse/HRL-1229) Allow get booking detail for stylist ([`72ff958`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/72ff9582732bfba8dd9a1294140654b18da248db))
- **updatePost**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Fix updatePost for stylist ([`68284fa`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/68284fa2c0e5a7294c507258f7c8bc734d21e191))

### Others

- Release/1.0.3 ([`#373`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/373))
- Release/1.0.4 ([`#409`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/409))
- Release/1.0.4 ([`#390`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/390))
- style(csv): [`HRL-1314`](https://c2cdoc.atlassian.net/browse/HRL-1314) Edit text ([`d14cb81`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d14cb8120eab741cd0ab306a6546653d2968ac74))

## v1.0.3
[2021-10-06]

### Features

- **addCard**: [`HRL-1014`](https://c2cdoc.atlassian.net/browse/HRL-1014) Make cardHolderName optional ([`#356`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/356))
- **duration**: [`HRL-1156`](https://c2cdoc.atlassian.net/browse/HRL-1156) Convert duration to minutes ([`#357`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/357))
- **email**: [`HRL-1158`](https://c2cdoc.atlassian.net/browse/HRL-1158) [`HRL-1189`](https://c2cdoc.atlassian.net/browse/HRL-1189) Update email content for salon, stylist and customer ([`2d382bc`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/2d382bc83263126aef4e40390d446297991fa43a))
- **prefecture**: [`HRL-1205`](https://c2cdoc.atlassian.net/browse/HRL-1205) Add createdAt, updatedAt for Prefecture table ([`9bf9832`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9bf9832d0ebeda8d01c2007a3009a72133556547))
- **prefecture**: [`HRL-1205`](https://c2cdoc.atlassian.net/browse/HRL-1205) Add Prefecture table ([`ee01f73`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ee01f73fceaa7cbd1cd2b27583daef35cd0ed363))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Add apidoc folder 1.0.3 ([`826e258`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/826e2580215841c10797fdd2ce185feef9daf7c9))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix PR's comments ([`d754ac5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d754ac5b7320edbd9a6dae1952be1faddd9d075b))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix PR's comments ([`6b3cb19`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/6b3cb193b9f8feaf4d68ac98acf1c35e43da13f0))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix PR's comments ([`e74156a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e74156a987d31fcb4876b41b5548ef51e57fd0be))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix PR's comments ([`0488a7c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0488a7c2a833ec0ea2a77c7430ce28186c454d90))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix PR's comments ([`ebc9320`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ebc9320a2078ab1dfdb41bf206d2aedce4aeb409))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix PR's comments and add template PAYMENT_ERROR_FOR_STYLIST ([`be3330e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/be3330ec3e8d466ee25fa9358e26b8380f18c989))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Fix registerDevice API ([`c2de8eb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c2de8eb32fb89df563095bee81a34277ada248e6))
- **pushNotification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Implement push notification ([`#343`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/343))

### Fixes

- **booking**: [`HRL-1190`](https://c2cdoc.atlassian.net/browse/HRL-1190) Return errorMenuIds when createBooking ([`56571e6`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/56571e6e7a0cad2da186623c9d54f5c3f974711b))
- **customerGetSalonDetailPage**: [`HRL-1201`](https://c2cdoc.atlassian.net/browse/HRL-1201) Add limit ([`d9f00d4`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d9f00d47410499e211dc51208bec3044eaaf8eed))
- **duration**: [`HRL-1156`](https://c2cdoc.atlassian.net/browse/HRL-1156) Convert booking's totalDuration ([`fd674d0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fd674d0824512f46d6a4f42dc239c22f0f93cbf5))
- **email**: [`HRL-1189`](https://c2cdoc.atlassian.net/browse/HRL-1189) Fix email content ([`8af9e94`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8af9e949e63856abd9d19bfdc780ea584139ea8d))
- **getMenuItemList**: [`HRL-1145`](https://c2cdoc.atlassian.net/browse/HRL-1145) Do not hide UNPUBLISHED Category ([`c96dc27`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c96dc27c4383061fe12f80cd74fc96b3eadeec5d))
- **getStylistAvailableSlots**: [`HRL-1109`](https://c2cdoc.atlassian.net/browse/HRL-1109) Fix bug last minute of available slot ([`#352`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/352))
- **getStylistUnavailableDaysOfMonth**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Fix not show unavailable days of current month ([`#354`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/354))
- **node**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Fix error due to different version of node ([`#358`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/358))
- **notification**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Disable notification by default ([`#359`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/359))
- **prefecture**: [`HRL-1205`](https://c2cdoc.atlassian.net/browse/HRL-1205) Remove createdAt in result'API ([`3cfe31d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3cfe31dddc3f60cea21582b56dc727a8b63eb1e6))
- **registerDevice**: [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Make deviceToken required & apidoc ([`85391ee`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/85391eec9914ba05db27c21cf285af4b164637f9))
- Fix/[`HRL-1156`](https://c2cdoc.atlassian.net/browse/HRL-1156) ([`#361`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/361))

### Others

- ci(test): [`HRL-1063`](https://c2cdoc.atlassian.net/browse/HRL-1063) Update notification-service-client/lib when not found ([`bdfeb99`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/bdfeb99fd962b93412249469cff6ffc94313a902))
- docs **apidoc**: [`HRL-1156`](https://c2cdoc.atlassian.net/browse/HRL-1156) Update version apidoc ([`#360`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/360))
- docs **apidoc**: [`HRL-1190`](https://c2cdoc.atlassian.net/browse/HRL-1190) Edit apidoc ([`388ab96`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/388ab96d762c3cd88a83ffda3c873cdcf82bd4e0))
- docs **customerGetSalonDetailPage**: [`HRL-1201`](https://c2cdoc.atlassian.net/browse/HRL-1201) Edit apidoc ([`c6259bd`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c6259bde67f25e7a9ff9a13bd73eeb1abdb7f7e8))
- Release/1.0.3 ([`#379`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/379))
- style(email): [`HRL-1126`](https://c2cdoc.atlassian.net/browse/HRL-1126) Update email content in footer ([`9362e86`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9362e86048018a3770dea038d1452f6951abda90))

## v1.0.2
[2021-09-07]

### Features

- **customer**: [`HRL-1050`](https://c2cdoc.atlassian.net/browse/HRL-1050) Credit card are not allowed to be deleted while there is an booking ([`#348`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/348))
- **dynamic-link**: [`HRL-932`](https://c2cdoc.atlassian.net/browse/HRL-932), [`HRL-934`](https://c2cdoc.atlassian.net/browse/HRL-934) Setup activation/forgotPass link to forward app / web ([`bb3b71f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/bb3b71fc1b36bd391dd98b275d155e9278c0b15c))
- **migration**: [`HRL-1029`](https://c2cdoc.atlassian.net/browse/HRL-1029) Add createStylistUrl to Parse Config ([`45b10f3`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/45b10f33dcb5c95fd75a0b10c1a4b00e22213eb5))
- **migration**: [`HRL-1029`](https://c2cdoc.atlassian.net/browse/HRL-1029) Update createStylistUrl to Parse Config ([`#337`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/337))
- **post**: [`HRL-962`](https://c2cdoc.atlassian.net/browse/HRL-962) Add menu's description for APIs customerGetPostDetailPage, getPostDetail, getPostList ([`6a9954d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/6a9954dabf7f26313045e60d05620a576a659b04))
- **salon**: [`HRL-1043`](https://c2cdoc.atlassian.net/browse/HRL-1043) Redirect to customer set-password page ([`80f9536`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/80f9536a83ce44a3476e0b4045d3c4656df62d08))
- **salon**: [`HRL-1051`](https://c2cdoc.atlassian.net/browse/HRL-1051) Add emailAndRole for both (re)set-password ([`c55262e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c55262ebe72faa2586f573c163dde26e23055df8))
- **server**: [`HRL-1053`](https://c2cdoc.atlassian.net/browse/HRL-1053) Remove SalonSchedule collection ([`#347`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/347))
- **set-password**: [`HRL-1043`](https://c2cdoc.atlassian.net/browse/HRL-1043) Add mail and role in set-password redirect link ([`2720999`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/27209992d02cddd8fad016ce0bd15c1779b35b80))
- **stylist, customer**: [`HRL-1051`](https://c2cdoc.atlassian.net/browse/HRL-1051) Change reset-password to set-password for first time ([`#331`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/331))
- **stylist**: [`HRL-1057`](https://c2cdoc.atlassian.net/browse/HRL-1057) Allow stylist CRUD post ([`#335`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/335))
- **stylist**: [`HRL-1057`](https://c2cdoc.atlassian.net/browse/HRL-1057) Allow stylist CRUD post ([`#334`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/334))
- **stylist**: [`HRL-1067`](https://c2cdoc.atlassian.net/browse/HRL-1067) Stylist can confirm/complete/cancel his own booking ([`#344`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/344))
- **stylist**: [`HRL-1067`](https://c2cdoc.atlassian.net/browse/HRL-1067) Stylist can confirm/complete/cancel his own booking ([`#339`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/339))
- **stylist**: [`HRL-1071`](https://c2cdoc.atlassian.net/browse/HRL-1071) Send email for stylist ([`#346`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/346))
- **stylist**: [`HRL-1071`](https://c2cdoc.atlassian.net/browse/HRL-1071) Send email for stylist ([`#345`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/345))
- **stylist**: [`HRL-1071`](https://c2cdoc.atlassian.net/browse/HRL-1071) Send email for stylist ([`#342`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/342))
- **stylist**: [`HRL-1085`](https://c2cdoc.atlassian.net/browse/HRL-1085) Assign, unassign menu to stylist ([`#349`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/349))
- **stylist**: [`HRL-984`](https://c2cdoc.atlassian.net/browse/HRL-984) Return stylistEmail in getStylistDetail ([`#333`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/333))
- **stylist**: [`HRL-984`](https://c2cdoc.atlassian.net/browse/HRL-984) Update APIs ([`36ccd41`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/36ccd41df9419983580e7d9cfae838b7d7876ea3))

### Fixes

- **dynamic-link**: [`HRL-1044`](https://c2cdoc.atlassian.net/browse/HRL-1044) Remove dynamic link ([`0e74c46`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0e74c46f934b0c549438972260e6fc13198a44c8))
- **dynamic-link**: [`HRL-934`](https://c2cdoc.atlassian.net/browse/HRL-934) Fix encoded redirect link ([`c240edb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c240edbf6fe75fe400923a198681e2c2911e28a1))
- **dynamic-link**: [`HRL-934`](https://c2cdoc.atlassian.net/browse/HRL-934) ResetPassword dynamic link only for customer role ([`21c1472`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/21c147213d25c9e2bda9c94bd9fe7bba2d5efe9f))
- **post**: [`HRL-1003`](https://c2cdoc.atlassian.net/browse/HRL-1003) Post with max 3 images [skip-ci] ([`73faa1a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/73faa1a75a1e1434479fd39711c62534cadcbd8d))
- **stylist**: [`HRL-984`](https://c2cdoc.atlassian.net/browse/HRL-984) Fix update _User email ([`#341`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/341))
- **stylist**: [`HRL-984`](https://c2cdoc.atlassian.net/browse/HRL-984) Fix update _User email ([`#340`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/340))
- **stylist**: [`HRL-984`](https://c2cdoc.atlassian.net/browse/HRL-984) Update API getStylistList, getStylistDetail, updateStylist ([`ba2f38d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ba2f38d35feb759eed8afcfcad9750f179699d61))

### Others

- docs **apidoc**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Dump version apidoc ([`f185c3b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f185c3b6827ed26928bfd5ab0970ffea558d5a6a))
- docs **apidoc**: [`HRL-984`](https://c2cdoc.atlassian.net/browse/HRL-984) Update apidoc ([`8079259`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/807925954702c5f9cf98ab73beca977d002b9c72))
- Release/1.0.2 ([`#351`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/351))
- revert(migration): [`HRL-1029`](https://c2cdoc.atlassian.net/browse/HRL-1029) Update createStylistUrl to Parse Config ([`#338`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/338))

## v1.0.1
[2021-08-09]

### Features

- **csv**: [`HRL-964`](https://c2cdoc.atlassian.net/browse/HRL-964) Create salon acc from CSV (CSV -&gt; DB) ([`9741d16`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9741d16b692fdd356006c836423922823ae93c2c))
- **csv**: [`HRL-979`](https://c2cdoc.atlassian.net/browse/HRL-979) Create stylist acc from CSV (CSV -&gt; DB) ([`7d64fb9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7d64fb94c73393283949ca28b9c70615c0b3e3e7))
- **email**: [`HRL-1002`](https://c2cdoc.atlassian.net/browse/HRL-1002) Send email booking-requested ([`0cbffcb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0cbffcb94e4c69bd231e96a04e0b0ebc992c2dd6))

### Fixes

- **csv**: [`HRL-964`](https://c2cdoc.atlassian.net/browse/HRL-964) Fix typo ([`ea88a31`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ea88a316c35c17524f89b9a2b49b988a52207eff))
- **email**: [`HRL-002`](https://c2cdoc.atlassian.net/browse/HRL-002) Edit content email salon-registration-completion ([`aaccc27`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/aaccc279ceee1ea4fce1474254855f70e5513368))
- **email**: [`HRL-005`](https://c2cdoc.atlassian.net/browse/HRL-005) Send email when cancel requested booking ([`3f638c1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3f638c124889f9a3a5247f76946f42245d63b978))
- **post**: [`HRL-1003`](https://c2cdoc.atlassian.net/browse/HRL-1003) Post with max 4 images (Feedback (ver.1.0) - No 2) ([`efcd916`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/efcd916a50cff68136ab7bb5106965f7dcbec46f))
- **salon**: [`HRL-1003`](https://c2cdoc.atlassian.net/browse/HRL-1003) Add '_' to CB businessName ([`c86f463`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c86f46368f67af2a2788c5376264eba48b67db2e))

### Others

- docs **apidoc**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Add Error to apidoc ([`b8fd141`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b8fd1416fdd4599bda623f8189aa3f25b8b3b1da))
- Release/1.0.1 ([`#325`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/325))
- style(email): [`HRL-002`](https://c2cdoc.atlassian.net/browse/HRL-002) Edit content email salon-registration-completion ([`#323`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/323))

## v1.0.0
[2021-07-30]

### Features

- **booking**: [`HRL-930`](https://c2cdoc.atlassian.net/browse/HRL-930) API getStylistUnavailableDaysOfMonth from today ([`b5946cb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b5946cb0702535bb3e2c9a11c8d10ed613e56402))
- **booking**: [`HRL-935`](https://c2cdoc.atlassian.net/browse/HRL-935) Customer cannot cancels booking after serviceDateTime ([`58a5c69`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/58a5c69b7daabf1e3a481713c0b3c35fecb49e39))
- **logger**: [`HRL-919`](https://c2cdoc.atlassian.net/browse/HRL-919) [Server] Disable logging on a file ([`eb76acf`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/eb76acfd5599b6160e57ed382343381f445f0a81))
- **ParseConfig**: [`HRL-936`](https://c2cdoc.atlassian.net/browse/HRL-936) Add ParseConfig and fix migration ([`9bdadbb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9bdadbb6dafeb2c2ace470d98456bd5e79fbf15c))

### Fixes

- **available-slot**: [`HRL-001`](https://c2cdoc.atlassian.net/browse/HRL-001) Fix by adding createdAt day to getStylistUnavailableDaysOfMonth ([`5a664bf`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5a664bff308d2f94266de9cc3b01842d44f7f473))
- **closingdate**: [`HRL-004`](https://c2cdoc.atlassian.net/browse/HRL-004) Fix missing timezone ([`89f85a0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/89f85a005c5dd2db3729173bfe6aa296b20c42a0))
- **CombinedCacheAdapter**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Fix CombinedCacheAdapter ([`58d09d7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/58d09d7a0dedd817dbc18f7b0658c4ca1fe97f0e))
- **weekview**: [`HRL-003`](https://c2cdoc.atlassian.net/browse/HRL-003) Fix missing booking stats on weekview ([`0fe5a38`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0fe5a38de3492372a728c1481c9150871890f32b))

### Others

- **db-scripts**: [`HRL-895`](https://c2cdoc.atlassian.net/browse/HRL-895) Mask info & merge DB PROD into STG ([`b5ad7ed`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b5ad7edf5c76d438d6518a168ef492eb9826c982))
- **dbProduction**: [`HRL-895`](https://c2cdoc.atlassian.net/browse/HRL-895) Check number of params ([`b9a64a0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b9a64a0969c1ac22829e09badca385fddcab7189))
- **dbProduction**: [`HRL-895`](https://c2cdoc.atlassian.net/browse/HRL-895) Fix error mongoimport ([`ed48281`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ed48281c8666aaefd013a2966a79b58d1ffe5340))
- **production**: [`HRL-897`](https://c2cdoc.atlassian.net/browse/HRL-897) Add "Mirror image to production account" ([`86691c9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/86691c95bb0bbf248d4fb97f0a6489f92e6bd2ea))
- **production**: [`HRL-897`](https://c2cdoc.atlassian.net/browse/HRL-897) Add pipeline for production ([`8c9f387`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8c9f387e3198f580ce152fb7865ad0cdfa45085e))
- style(email): [`HRL-002`](https://c2cdoc.atlassian.net/browse/HRL-002) Edit content email registration-completion ([`ed7a2f8`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ed7a2f872c5f358867845b0ccb05e4efbbbeb359))

## v0.7.0
[2021-07-15]

### Features

- **booking**: [`HRL-930`](https://c2cdoc.atlassian.net/browse/HRL-930) Customer can send a booking request at least 60 mins before the desired service time ([`55d3a06`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/55d3a0627a2d10fde4181ad757a3ba722c2be9ca))
- **booking**: [`HRL-935`](https://c2cdoc.atlassian.net/browse/HRL-935) Customers won't be charged for canceling the booking on the service day ([`5a3a9e1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5a3a9e186afeedfae7fc5292953557315af74a16))

### Others

- **dbProduction**: [`HRL-895`](https://c2cdoc.atlassian.net/browse/HRL-895) Add script to automate the conversion ([`e66dfdc`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e66dfdc12bb1de212cc9436f3a3a6956a7630cdc))
- Merge commit '55d3a0627a2d10fde4181ad757a3ba722c2be9ca' into develop ([`56d3216`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/56d321612eb1d945f9dc55c76931348df31f2fea))
- Merge commit 'e66dfdc12bb1de212cc9436f3a3a6956a7630cdc' into develop ([`7d6229d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7d6229d6a5b78fa344b9cf735afbbb21468bd743))

## v0.6.3
[2021-07-07]

### Others

- **dbProduction**: [`HRL-895`](https://c2cdoc.atlassian.net/browse/HRL-895) Write DB script clone DB PROD -&gt; STG ([`87742ad`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/87742ad0201efd72e1080b084b28c137ddbe33f8))
- docs **updateMenuItem**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Add missing menuId in example ([`#287`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/287))
- Merge commit '87742ad0201efd72e1080b084b28c137ddbe33f8' into develop ([`1902746`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1902746463ada03709a4a3f882aba2f0a2e364a3))

## v0.6.2
[2021-07-02]

### Fixes

- **completeBooking**: [`HRL-913`](https://c2cdoc.atlassian.net/browse/HRL-913) Allow Salon to complete booking in service day ([`5be88ca`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5be88caeb93d736d6ac3a70c7b0d31c60a62aebc))
- **email**: [`HRL-872`](https://c2cdoc.atlassian.net/browse/HRL-872) Send email when updateBookingCard ([`ca32874`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ca328746135e0aa5eb9737974b0ac39de493ab6f))

## v0.6.1
[2021-06-30]

### Fixes

- **dashboard**: [`HRL-837`](https://c2cdoc.atlassian.net/browse/HRL-837) Fix from, to in getBookingList & getStylistList ([`f127a3b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f127a3b2588ebb335876d051c60eb5dc03ca60f2))
- **dayview weekview**: [`HRL-899`](https://c2cdoc.atlassian.net/browse/HRL-899) Fix remove unused field ([`ecac168`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ecac168ef3057f0ccc629ef795f59b1cda602ebb))
- **dayview weekview**: [`HRL-899`](https://c2cdoc.atlassian.net/browse/HRL-899) Fix remove unused field ([`6f18f14`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/6f18f141bc5401dc6f9fb4dc646afcbc02a4d6b2))
- **dayview weekview**: [`HRL-899`](https://c2cdoc.atlassian.net/browse/HRL-899) Remove unused field ([`d8b701a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d8b701a5c1994f5d828dd8df1e6cee2fd5dc0dc8))
- **email**: [`HRL-872`](https://c2cdoc.atlassian.net/browse/HRL-872) Send email when rechargeBooking ([`4c0dea5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/4c0dea5bb3b36538a31655077aca40dffd645714))
- **test**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Fix test migrate fail ([`8b5b1cd`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8b5b1cd8a5437167141b6fc73c96ce53607ee1f9))

### Others

- Merge commit '6f18f141bc5401dc6f9fb4dc646afcbc02a4d6b2' into develop ([`3bcc74e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3bcc74e8c9c4beb19a1f5648b885d6b29c8d42c6))
- Merge commit 'd8b701a5c1994f5d828dd8df1e6cee2fd5dc0dc8' into develop ([`940201b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/940201b4a31f5c485a9b43c0fc3eb3144f31d8a6))
- Merge commit 'ecac168ef3057f0ccc629ef795f59b1cda602ebb' into develop ([`0f84c4e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0f84c4e06c2a7b28f78101dd274c2d19c7e2d762))
- Merge commit 'f127a3b2588ebb335876d051c60eb5dc03ca60f2' into develop ([`36efbd3`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/36efbd38deee0c66405517b59929b5c58d1a0c14))

## v0.6.0
[2021-06-24]

### Features

- **bookingList**: [`HRL-837`](https://c2cdoc.atlassian.net/browse/HRL-837) Update Search on Booking list page ([`ec5123f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ec5123f77f54268c2fcc8576942f43e97090971f))
- **contact-us**: [`HRL-815`](https://c2cdoc.atlassian.net/browse/HRL-815) Save form contact us and send email ([`a0159cd`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a0159cdba990eced680fd719a9a3c59d79dc9975))
- **customer**: [`HRL-791`](https://c2cdoc.atlassian.net/browse/HRL-791) Add getStylistUnvailableDaysOfMonth API ([`c5aa0b0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c5aa0b0e50effcfc1ca4d5e781a9f6e375fc11c4))
- **monitoring**: [`HRL-635`](https://c2cdoc.atlassian.net/browse/HRL-635) Add /metrics API ([`5e2ba74`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5e2ba74ca34a79b049b4b4626da8f6bf7da119f7))
- **salonDashboard**: [`HRL-836`](https://c2cdoc.atlassian.net/browse/HRL-836) Add Search and Sort on Stylist list page ([`939dc27`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/939dc27188b5df7604a779ba4c0bf00e258e1368))
- **slug**: [`HRL-825`](https://c2cdoc.atlassian.net/browse/HRL-825) Add salon's slug & stylist's slug for customerGetStylistDetailPage ([`03ca71b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/03ca71b7cf0251a1bae45d48587592394aaf8b92))
- **slug**: [`HRL-825`](https://c2cdoc.atlassian.net/browse/HRL-825) Add salon's slug for Post and Stylist ([`#262`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/262))
- **slug**: [`HRL-825`](https://c2cdoc.atlassian.net/browse/HRL-825) Add slug ([`352c3d1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/352c3d12800cd99b99299aa58a2d89cfdb427028))
- **slug**: [`HRL-825`](https://c2cdoc.atlassian.net/browse/HRL-825) Add slug ([`094302f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/094302f6607d9cc468f44e2bce528adf1c643704))
- **slug**: [`HRL-825`](https://c2cdoc.atlassian.net/browse/HRL-825) Add slug for salon and stylist ([`88346ad`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/88346ad34da7e55e84db643c71db22cff9216985))
- **slug**: [`HRL-842`](https://c2cdoc.atlassian.net/browse/HRL-842) Update booking detail page ([`88f26ba`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/88f26baaaa6b2b5b878aca6786834045ea6ce509))
- **slug**: [`HRL-842`](https://c2cdoc.atlassian.net/browse/HRL-842) Update booking detail page ([`1e5b919`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1e5b9199836246af16cdf0427c5df19d929552e6))

### Fixes

- **admin**: [`HRL-809`](https://c2cdoc.atlassian.net/browse/HRL-809) GetCustomerList search via fullName & phoneticFullName ([`1c65071`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1c650715a1e83c20812cafd93ce16302e4d313d0))
- **contact-us**: [`HRL-815`](https://c2cdoc.atlassian.net/browse/HRL-815) Add style to wrap text in contact us email ([`#268`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/268))
- **contact-us**: [`HRL-815`](https://c2cdoc.atlassian.net/browse/HRL-815) Fix wrong migrate file name ([`d325474`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d325474ab4e54372f6a666c94c6bcfc7b4898e2a))
- **customer**: [`HRL-816`](https://c2cdoc.atlassian.net/browse/HRL-816) Fix cannot getStylistAvailableSlots ([`7249d5a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7249d5a991e9efdd5f9037877cc04a39a0df42cf))
- **migration**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Add await for addAndSyncCBSalonInfo array ([`22f69c8`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/22f69c86b5c6eb9609e0ce1bd269ca62ec44b29e))
- **schedules**: [`HRL-810`](https://c2cdoc.atlassian.net/browse/HRL-810) Throw error when updateStylistDailySchedule with wrong dayOfWeek ([`f8df2ac`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f8df2ac4fbb828c98e818fe30ea1e317d267f565))
- **slug**: [`HRL-825`](https://c2cdoc.atlassian.net/browse/HRL-825) Fix bug slug with '-' ([`be91bc4`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/be91bc43136354d73be8b7fe6feedf0be1e83b60))

### Others

- **elb**: [`HRL-852`](https://c2cdoc.atlassian.net/browse/HRL-852) Add /health and move payment to submodule ([`10643cc`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/10643cce333f2f6f4fe6ec4aca3f4183f6b68b00))
- **elb**: [`HRL-852`](https://c2cdoc.atlassian.net/browse/HRL-852) Build image with Dockerfile & add dockerignore ([`d53f6e2`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d53f6e2146679cb9ef199620becff10182e478ac))
- **elb**: [`HRL-852`](https://c2cdoc.atlassian.net/browse/HRL-852) Remove parse-image & Parse not found Errors in helper when run test ([`3e66643`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3e66643c97a5456a34c74b722bfc2fa23348eb39))
- **elb**: [`HRL-852`](https://c2cdoc.atlassian.net/browse/HRL-852) Update Bitbucket pipeline & add docker-compose ([`ee096fc`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ee096fc1e8b0f7fa33ce32243fbbdbe3ee68223f))
- **node**: [`HRL-641`](https://c2cdoc.atlassian.net/browse/HRL-641) Upgrade NodeJS 14 ([`140fded`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/140fded46b79f379b7a0650b7f7b464e176d79d0))
- **stg**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Change mongo stg user/password ([`64455f2`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/64455f2c76b3b67447de5ab2d215005c1490555b))
- ci(elb): [`HRL-852`](https://c2cdoc.atlassian.net/browse/HRL-852) Deploy with EB & Logging service ([`#275`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/275))
- docs **CB**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Add documentation for CB ([`f5fdce9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f5fdce9700de9f19e0114b5a6857585fc046d5e6))
- style(email): [`HRL-872`](https://c2cdoc.atlassian.net/browse/HRL-872) & [`HRL-869`](https://c2cdoc.atlassian.net/browse/HRL-869) Update email content in some cases and show nickName in case 5-2 ([`97b6aa0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/97b6aa053445b6a2c3f0fc0f9b2678b78b659bb3))
- style(mail): [`HRL-854`](https://c2cdoc.atlassian.net/browse/HRL-854) Update the content for all emails footer ([`2b7342f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/2b7342f5a92cdb3c0f6c869e6e529924eb7df387))
- test(customer): [`HRL-823`](https://c2cdoc.atlassian.net/browse/HRL-823) Write script measure performance customer's User/Profile ([`f523074`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f5230740c55eb7f1b12ffd80cd2ba58c09ffb976))

## v0.5.3
[2021-05-21]

### Features

- **booking schedule**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) [Salon] [web] Cannot add closing date or close a slot when there's a booking ([`fca7887`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fca78875d1a6f6d4d9764548c5f3b3f896754879))
- **booking**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Add getBookingStats API ([`1999ea9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1999ea9d80e15de4b8ca8b84ffafa7ade5bd832f))
- **booking**: [`HRL-670`](https://c2cdoc.atlassian.net/browse/HRL-670) [BE] [Salon][web,mobile] Update complete booking detail page ([`#200`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/200))
- **booking**: [`HRL-734`](https://c2cdoc.atlassian.net/browse/HRL-734) [Customer] Update available slots in booking step 2 ([`47c8b74`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/47c8b740c4f4d52c1f0e38f05f611aefbfa9fdbf))
- **closingdate**: [`HRL-652`](https://c2cdoc.atlassian.net/browse/HRL-652) Salon Operator can add closing date for the Salon ([`53d902e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/53d902e65cdc877bd4b106133013fe2ee13d97a5))
- **day view**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Transform getStaffScheduleOfSalon response for FE ([`cc67e5b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/cc67e5ba08121b83850b202ca971a2649f7b25e7))
- **dayview weekview**: [`HRL-616`](https://c2cdoc.atlassian.net/browse/HRL-616) Add isSalonClosedDate ([`147f957`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/147f957ccdc4b6135ab91487a372a43253dd255e))
- **dayview weekview**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Add getFullStaffScheduleOfSalon & currentSchedule ([`#203`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/203))
- **dayview weekview**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Add getFullStaffScheduleOfSalon & currentWeeklySchedule ([`ac615cf`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ac615cf9af62359b1d20362892f69b7f00fe4447))
- **dayview**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Add bookings to getStaffsScheduleOfSalonDayView API ([`053afad`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/053afadcec5771c9cc84fdeab57a5ad757b68e09))
- **dayview**: [`HRL-729`](https://c2cdoc.atlassian.net/browse/HRL-729) Sort the order of stylists in the timetable and update API getClosingDates ([`3c58995`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3c58995525c9ad25ff436380fcb7b6fc230f2834))
- **feature**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) Update salon schedule may shrink stylist's weekly schedule ([`#198`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/198))
- **feature**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) Update salon schedule will impact stylist's weekly schedule ([`1ee4cb0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1ee4cb0a0c4f5d86d7dcdd606e2467ffe645b284))
- **logout**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Add logout API ([`4f3319f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/4f3319f9a64c4bebde8bd65432c22c7f51e72a77))
- **notification**: [`HRL-741`](https://c2cdoc.atlassian.net/browse/HRL-741) Salon notitication when have new booking request ([`09269b6`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/09269b67458fb7d526a7b74bdd60352cb055906c))
- **schedule**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) Fix PR's comments ([`dd6dd99`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/dd6dd994d49d6d70afdbf0db0c2edffc1e2305a8))
- **schedule**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) Newly created stylist have empty schedule ([`#199`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/199))
- **schedule**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Group daily schedule ([`ef76d6c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ef76d6cda4ee69375d3dc2368cc3fd369efbcea8))
- **staff salon**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Sync staff to CB ([`9ad9b46`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9ad9b463a306dc38ad14ea04a96d894d139f6eec))
- **todo**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Handle case when addSalon/addStaff in CB succeeded but it fails in Hairlie ([`3727a16`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3727a16470404e111c7edde82096c5fe9c34f427))
- **weekview**: [`HRL-616`](https://c2cdoc.atlassian.net/browse/HRL-616) & [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Implement getStaffsScheduleOfSalonWeekView API ([`1278a82`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1278a82006d365c6a786f2f8138901d22a0b73b1))
- **weekview**: [`HRL-616`](https://c2cdoc.atlassian.net/browse/HRL-616) Add dayAvailability & fix dayOfWeek ([`7833fe0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7833fe02f89ceb2a5bb743a732abb738dcd30f95))
- **weekview**: [`HRL-753`](https://c2cdoc.atlassian.net/browse/HRL-753) Sort the order of stylists in the weekly timetable ([`c90e9bb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c90e9bbd5de8ca99051d6fc54189d805d7912625))

### Fixes

- **adminUpdateSalonInfo**: [`HRL-800`](https://c2cdoc.atlassian.net/browse/HRL-800) Fix admin cannot update salonName ([`f984282`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f9842826dae390a26c21da39f7c9ae2b9f7e8a47))
- **availableSlot**: [`HRL-780`](https://c2cdoc.atlassian.net/browse/HRL-780) Does not return time slots for booking on last available day ([`cf519b2`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/cf519b286cb95b8362aec40c6ae833db056bc81f))
- **booking schedule**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) Fix AffectBookingError with stylistId ([`d0103f5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d0103f5e703a49169c1054f8bab8a6eb0b8779c0))
- **booking schedule**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) Fix by removing minusSchedule ([`29f08fe`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/29f08fea9e8015655a8027ea708269ce0785f7b3))
- **booking schedules**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) Updating salon schedule affect from today and stylist's weekly schedule affect from start of tomorrow ([`6784999`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/6784999d39f78c9987097e5cb179326fea7eae1f))
- **booking**: [`HRL-734`](https://c2cdoc.atlassian.net/browse/HRL-734) Fix booking error ([`0e59d56`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0e59d56439016307d0f5da3e2cec1a3705cf8c36))
- **completeBooking**: [`HRL-670`](https://c2cdoc.atlassian.net/browse/HRL-670) Can't complete booking when original menu has 1 menu disabled ([`198a9a9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/198a9a9023164996dd3250a10c28cc3a6b895fdb))
- **completeBooking**: [`HRL-670`](https://c2cdoc.atlassian.net/browse/HRL-670) New added menus must be published ([`29bcd31`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/29bcd31958d2483368c3813d69a85bdb3ba51898))
- **confirmbooking stylists**: [`HRL-775`](https://c2cdoc.atlassian.net/browse/HRL-775) Add getAvailableStylists API ([`00cfb5e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/00cfb5e0c4bca24cb289232f364ac6ad63920a8d))
- **confirmBooking**: [`HRL-775`](https://c2cdoc.atlassian.net/browse/HRL-775) CheckAvailableDateTime when change stylist ([`b4ffe99`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b4ffe99afa59e9e8a65bd097d3fc28e45608ac73))
- **confirmBooking**: [`HRL-775`](https://c2cdoc.atlassian.net/browse/HRL-775) Fix by not checking available day when change stylist ([`e1c6add`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e1c6add01b63c5b7c707fefd929f96b1713ee69c))
- **confirmBooking**: [`HRL-775`](https://c2cdoc.atlassian.net/browse/HRL-775) Fix by not increment minSlot and checking isFirstAvailableDay in getAvailableStylists ([`7929e90`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7929e9073de94ca10d259496c024e07d866573fe))
- **createBooking**: [`HRL-780`](https://c2cdoc.atlassian.net/browse/HRL-780) Allow create booking in last slots of last available day ([`3d6589f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3d6589f3b602a077d64386d70825c6088ac0de07))
- **customerGetStylistDetailPage**: [`HRL-797`](https://c2cdoc.atlassian.net/browse/HRL-797) Fix cannot book in post page ([`eec6454`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/eec6454e2918cf892b509c4da7ade12fbd4e48d9))
- **customerGetStylistDetailPage**: [`HRL-797`](https://c2cdoc.atlassian.net/browse/HRL-797) Not show unpublished stylist ([`b5a2042`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b5a2042ca3a25e2d5b2deec97611796149deb119))
- **dayview weekview**: [`HRL-616`](https://c2cdoc.atlassian.net/browse/HRL-616) Fix weekly schedule day off error ([`8130f60`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8130f604aa8b3375e3ae9615f5495289267f1aea))
- **dayview weekview**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Fix salon off day error ([`3753fbe`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3753fbe678076335fea5e8fc2b4745b8b27c8f45))
- **dayview**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Fix error ([`#187`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/187))
- **email-content**: [`HRL-669`](https://c2cdoc.atlassian.net/browse/HRL-669) Update all emails content ([`d7e4d27`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d7e4d27c7c255a277f04362ede6165e5a8414a12))
- **email**: [`HRL-669`](https://c2cdoc.atlassian.net/browse/HRL-669) Update all email content ([`e1107f7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e1107f70fdf9f2f07b2c6c4bd40d3de839cf86bb))
- **getStylistAvailableSlot**: [`HRL-652`](https://c2cdoc.atlassian.net/browse/HRL-652) Taking care closing date in getStylistAvailableSlot ([`5417ba7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5417ba7c2f83ed99b456b98d344b89547b0a185c))
- **migration deploy**: [`HRL-789`](https://c2cdoc.atlassian.net/browse/HRL-789) Fix migration ([`de9473f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/de9473f3ef2206f39e8b8d58fa80eb6d8354b88b))
- **schedule**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) [`HRL-719`](https://c2cdoc.atlassian.net/browse/HRL-719) Fix salon schedule is not set yet ([`f3d4bc7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f3d4bc76ac2153b209a993ba9fc27bdd9a542228))
- **schedule**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) Fix nickName, profileImages ([`#195`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/195))
- **schedule**: [`HRL-615`](https://c2cdoc.atlassian.net/browse/HRL-615) Fix nickName, salonName, profileImages ([`c74497b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c74497b451050ab216907aa910c5936a4974d57f))
- **schedule**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Fix with minusSchedules ([`0c2e135`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/0c2e1359dd20e5ba3ff1bdfa4f3b9863c6b2744d))
- **schedule**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) Fix updating salon schedule by merging stylist's weekly schedule ([`de13029`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/de130293e3ca219b437d56cca0f87fd9983fe2db))
- **schedule**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) Fix when change salon's schedule with stylistId ([`27f73a1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/27f73a1ea7f31ecad693b050d78cdd11dbcd32bc))
- **schedules booking**: [`HRL-723`](https://c2cdoc.atlassian.net/browse/HRL-723) Fix missing outside booking ([`853954b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/853954b92d4bacd871c47a821eb32c85b3888a9f))
- **schedules booking**: [`HRL-750`](https://c2cdoc.atlassian.net/browse/HRL-750) Fix having outsideBookingsToday not throw exception yet ([`4890f49`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/4890f49ca093e10b2718d24f5adbb39ec652711a))
- **schedules**: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) IsSalonClosedDate is never false ([`25d7958`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/25d795869e6b81e039cbb503d51bbe70f4fe5b2a))
- **schedules**: [`HRL-616`](https://c2cdoc.atlassian.net/browse/HRL-616) Filter weekly schedule ([`89221a5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/89221a5fdc42effdd7e744924eff5f661f754c02))
- **schedules**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Fix getUnavailableSchedule(dayAvailableSchedule, daySalonSchedule) ([`f3ed02a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f3ed02a1d7c8eaa39c411ac777538f9b34a6cb16))
- **schedules**: [`HRL-796`](https://c2cdoc.atlassian.net/browse/HRL-796) Fix createdAt date's schedules as -1 (/) ([`ee79e16`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ee79e16cd890458448a3e2194f15d1d5ed8d24ac))
- **schedules**: [`HRL-796`](https://c2cdoc.atlassian.net/browse/HRL-796) Fix schedules error after creating stylist ([`5d355ef`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5d355efbfbaf5766a119913c6057cdda6c60b660))
- **schedules**: [`HRL-798`](https://c2cdoc.atlassian.net/browse/HRL-798) Fix -3 is more priority than createdAt date (-1) ([`3f5d0cb`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3f5d0cbd626acd611048597cae9e439c0b347db9))
- **sync staff**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Fix error sync staff ([`#192`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/192))
- **weekly schedule**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Fix EMPTY_WEEKLY_SCHEDULE ([`296c629`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/296c6298ffac0a68fc2f22b51dc590df8e586bbf))
- **weekly schedule**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Reset weekly schedule after addStaff to CB ([`#194`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/194))
- **weekview**: [`HRL-648`](https://c2cdoc.atlassian.net/browse/HRL-648) Fix missing sumSchedule ([`907ca67`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/907ca676593c51aa1cc1bed49c0711cce2fd2f19))

### Others

- **parseserver**: [`HRL-651`](https://c2cdoc.atlassian.net/browse/HRL-651) Upgrade Parse server to lastest version ([`04aa15b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/04aa15b05cdbf582a1fd12bf519d54d6582d32a3))
- Release/0.5.0 ([`#247`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/247))
- style: [`HRL-000`](https://c2cdoc.atlassian.net/browse/HRL-000) Some formatting ([`ff2d303`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ff2d30315350ba65a4f20ab83de0f48dd42789c6))

## v0.5.2
[2021-04-06]

### Features

- **dashboard, admin**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Fix PR's comments ([`c7b8510`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c7b8510c5777bf37a396fabfe32de164000f9b93))
- **dashboard, admin**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Integrate Salon with CB ([`#182`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/182))
- **salon**: [`HRL-673`](https://c2cdoc.atlassian.net/browse/HRL-673) [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Sync cbSalonId and salon ([`#183`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/183))
- **stylist**: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Integrate stylist, stylist's schedule to CB ([`43a4f2c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/43a4f2c1ee24882632c514f70bdf84bb220ec42d))
- feat: [`HRL-637`](https://c2cdoc.atlassian.net/browse/HRL-637) Fix minor (var to const) ([`fe37701`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fe377015677d1c27c55dd273ba0b032c07aaa09f))

## v0.5.1
[2021-03-26]

### Fixes

- fix: [`HRL-628`](https://c2cdoc.atlassian.net/browse/HRL-628) Auto make change log dir ([`28c0070`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/28c007016cdf81c0c3bcfca12ff4a1b78211c9d4))

## v0.5.0
[2021-03-26]

### Others

- [`HRL-586`](https://c2cdoc.atlassian.net/browse/HRL-586) [Customer] Customer receive an email when Salon change the stylist ([`d9de057`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d9de05704480fb0bfb11bfca62c33de74f5e025a))
- [`HRL-603`](https://c2cdoc.atlassian.net/browse/HRL-603) [Server] Improve generate thumbnail by sharp lib ([`fd5003e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fd5003e2f5cdba0bc6bfc0407b4fea2bac4f487a))
- chore: [`HRL-628`](https://c2cdoc.atlassian.net/browse/HRL-628) Add commitlint, husky, changelog ([`347a2db`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/347a2dbbbfab7ed27fbebcad17854af2c006cded))
- chore: add commitlint, husky and changelog ([`#181`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/181))
- ci: [`HRL-628`](https://c2cdoc.atlassian.net/browse/HRL-628) Auto patch version and push ([`9c1447c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9c1447c8c2950332aa0fb84dd5ccad080e275fc8))

## v0.4.0
[2021-03-26]

### Features

- feature/[`HRL-572`](https://c2cdoc.atlassian.net/browse/HRL-572) Set default menu's duration to 1 ([`40e3225`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/40e3225b3506e73d7f7907d50d751804ab503827))

### Others

- [`HRL-405`](https://c2cdoc.atlassian.net/browse/HRL-405) Return getCardList for deleteCard &  addCard API ([`#124`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/124))
- [`HRL-446`](https://c2cdoc.atlassian.net/browse/HRL-446) [BE] [mobile/web] [customer/salon operator/admin] Add duration for each menu ([`9a0ada3`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9a0ada35845739f9d71939f2f745fb846dcfaef9))
- [`HRL-446`](https://c2cdoc.atlassian.net/browse/HRL-446) add getAvailableSlot API ([`8a8c453`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8a8c4533bcd60556e4693c0b42b44e9c207b8906))
- [`HRL-446`](https://c2cdoc.atlassian.net/browse/HRL-446) Return duration in customerGetSalonDetailPage API ([`#117`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/117))
- [`HRL-447`](https://c2cdoc.atlassian.net/browse/HRL-447) [BE] [customer/salon operator/admin] Add product URL for each product ([`#114`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/114))
- [`HRL-447`](https://c2cdoc.atlassian.net/browse/HRL-447) buildPostInfo with product's url ([`#116`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/116))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) [BE] Customer can make a booking from Stylist profile ([`#118`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/118))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Add paymentStatuses for getBookingList API ([`#123`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/123))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Check available date time ([`#128`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/128))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Check card exists ([`#129`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/129))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Check stylist's status (PUBLISHED) ([`#122`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/122))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Fix getAvailableSlot API ([`#134`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/134))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Fix getAvailableSlot bug ([`#149`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/149))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Fix getAvailableSlot bug ([`#148`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/148))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Fix step 2 realtime time slot bug ([`d6e7576`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/d6e7576bb6010e48b55f159a7b25cee2a9c39891))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Format serviceDateTime with toISOString() ([`#121`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/121))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Last time slot depends on duration ([`#126`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/126))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Rename note to paymentNote ([`#120`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/120))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Show and save cardInfo, delete last card error ([`#136`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/136))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) totalDuration with no max in getAvailableSlot ([`#131`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/131))
- [`HRL-449`](https://c2cdoc.atlassian.net/browse/HRL-449) Update booking's card ([`6b4665f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/6b4665fef17980824b43354b07a4c72e9c59df28))
- [`HRL-457`](https://c2cdoc.atlassian.net/browse/HRL-457) Change minConfirmBookingTime to 30 minutes ([`fd0389c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fd0389cfc77b9d3f2aa29a7bbaf98e4e808b4eef))
- [`HRL-457`](https://c2cdoc.atlassian.net/browse/HRL-457) Fix Thuy's comment in ticket and search ([`#125`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/125))
- [`HRL-464`](https://c2cdoc.atlassian.net/browse/HRL-464) Displays nickName instead of fullName for bookings ([`#135`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/135))
- [`HRL-469`](https://c2cdoc.atlassian.net/browse/HRL-469) Change redirectUrl for activation link ([`#130`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/130))
- [`HRL-471`](https://c2cdoc.atlassian.net/browse/HRL-471) Add customer's gender field in booking detail ([`#132`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/132))
- [`HRL-471`](https://c2cdoc.atlassian.net/browse/HRL-471) Recalculate totalPrice, totalDuration for completeBooking API ([`#144`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/144))
- [`HRL-471`](https://c2cdoc.atlassian.net/browse/HRL-471) Salon Operator can view a request booking detail and assign the booking to another stylist ([`43daf8c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/43daf8c6b1d0e9722eb865e9b4ac13c868b7e05a))
- [`HRL-471`](https://c2cdoc.atlassian.net/browse/HRL-471) Send confirm booking email and update MIN_CONFIRM_BOOKING_TIME to 30 minutes ([`e62f772`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e62f772fe868db0293172be390cff39627e5d0fe))
- [`HRL-473`](https://c2cdoc.atlassian.net/browse/HRL-473) Add addedMenus ([`#151`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/151))
- [`HRL-474`](https://c2cdoc.atlassian.net/browse/HRL-474) Add apidoc for recharge ([`#157`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/157))
- [`HRL-474`](https://c2cdoc.atlassian.net/browse/HRL-474) Charge with Veritrans ([`#150`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/150))
- [`HRL-474`](https://c2cdoc.atlassian.net/browse/HRL-474) Payment fails instead of card not found error ([`#164`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/164))
- [`HRL-474`](https://c2cdoc.atlassian.net/browse/HRL-474) Recharge and fix bugs ([`#153`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/153))
- [`HRL-485`](https://c2cdoc.atlassian.net/browse/HRL-485) Edit serviceDateTime and subjects ([`#168`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/168))
- [`HRL-485`](https://c2cdoc.atlassian.net/browse/HRL-485) Fix email contents bugs ([`#173`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/173))
- [`HRL-485`](https://c2cdoc.atlassian.net/browse/HRL-485) Fix email contents bugs ([`#172`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/172))
- [`HRL-485`](https://c2cdoc.atlassian.net/browse/HRL-485) salonAddress4 is optional ([`#170`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/170))
- [`HRL-485`](https://c2cdoc.atlassian.net/browse/HRL-485) Send email API ([`32b69d7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/32b69d76a430415da0794ed0f6f890572cf5e9f7))
- [`HRL-485`](https://c2cdoc.atlassian.net/browse/HRL-485) Update Email content for booking flow ([`#142`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/142))
- [`HRL-500`](https://c2cdoc.atlassian.net/browse/HRL-500) Update _p_customer in _User table and delete booking without customer ([`7280169`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7280169b71715fcf992961cb5765628b0ca44941))
- [`HRL-503`](https://c2cdoc.atlassian.net/browse/HRL-503) [Improvement] Show error card history at payment ([`#156`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/156))
- [`HRL-505`](https://c2cdoc.atlassian.net/browse/HRL-505) [Improvement] [Customer web] booking time logic ([`#163`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/163))
- [`HRL-507`](https://c2cdoc.atlassian.net/browse/HRL-507) Add isAssigned to post's menu detail ([`#155`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/155))
- [`HRL-507`](https://c2cdoc.atlassian.net/browse/HRL-507) Add menu's status to buildPostInfo ([`#152`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/152))
- [`HRL-507`](https://c2cdoc.atlassian.net/browse/HRL-507) Hide inactive menu ([`#166`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/166))
- [`HRL-507`](https://c2cdoc.atlassian.net/browse/HRL-507) Sort by status, isAssigned ([`430a6a4`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/430a6a49447bbf424a6b7d1f7e4625d9d18c3852))
- [`HRL-507`](https://c2cdoc.atlassian.net/browse/HRL-507) Sort categories in getPublishedMenusGroupedByCategory ([`#162`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/162))
- [`HRL-508`](https://c2cdoc.atlassian.net/browse/HRL-508) Return lastBookingStatus ([`#154`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/154))
- [`HRL-517`](https://c2cdoc.atlassian.net/browse/HRL-517) [Customer] [web/mobile] Allow customer make a booking with Unpublished stylist ([`#159`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/159))
- [`HRL-529`](https://c2cdoc.atlassian.net/browse/HRL-529) [Improvement] [Salon, Customer] [Web,mobile] Update Post Total Price when menu is inactive ([`#161`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/161))
- [`HRL-529`](https://c2cdoc.atlassian.net/browse/HRL-529) Hide/show inactive menus ([`#167`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/167))
- [`HRL-536`](https://c2cdoc.atlassian.net/browse/HRL-536) Fix customerGetStylistDetailPage API ([`#171`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/171))
- [`HRL-540`](https://c2cdoc.atlassian.net/browse/HRL-540) [Salon] Show card incorrectly in booking detail ([`#169`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/169))
- [`HRL-594`](https://c2cdoc.atlassian.net/browse/HRL-594) [BE] Salon Operator can take note when they cancel a request/confirm booking ([`a9d73ed`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a9d73ed6136c425d7aa08a0222fe1519c5b42b9c))
- [`HRL-612`](https://c2cdoc.atlassian.net/browse/HRL-612) [BE] [Admin] Cannot interact with customer's profile ([`5247778`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5247778c7bb6bfc85d659b0946affcb3c1a986aa))
- Change error code LOGIN_REQUIRED & PERMISSION_ERROR ([`#139`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/139))
- Update version 0.4.0 ([`df7496c`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/df7496cf18ed09aa0d3bb760d17e0b7e6233649c))
- Use sonarjs plugin ([`#137`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/137))

## v0.3.0
[2020-12-14]

### Fixes

- Fix Customer apidoc ([`f0c20ca`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f0c20cabeb5617f317538bd763bf813ff9e12d7d))
- Fix do not send registration-completion to customer ([`#104`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/104))

### Others

- [`HRL-371`](https://c2cdoc.atlassian.net/browse/HRL-371) [BE] Salon operator can change their Salon working schedule ([`b353f9f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b353f9fab9996bbe2fc78eb328b9a8ae483b401f))
- [`HRL-371`](https://c2cdoc.atlassian.net/browse/HRL-371) Error code for at-least-one-schedule error ([`#92`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/92))
- [`HRL-371`](https://c2cdoc.atlassian.net/browse/HRL-371) Salon operator can change their Salon working schedule ([`87af104`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/87af104a11e848b0ab92c63f09a98b03cf73b109))
- [`HRL-371`](https://c2cdoc.atlassian.net/browse/HRL-371) Salon schedule must have at least one day ([`9f14357`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9f14357e712c457ff7f4f21ed621a97aa75a50db))
- [`HRL-371`](https://c2cdoc.atlassian.net/browse/HRL-371) Salon schedule must have at least one day ([`854b4af`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/854b4af01519fc1790ab5ce5d64bc97e58a68960))
- [`HRL-377`](https://c2cdoc.atlassian.net/browse/HRL-377) [BE] Customer can register an account on Hairlie landing page ([`c9eb6c9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c9eb6c9a01e1ffba4842b7bbb0f560f335384e67))
- [`HRL-377`](https://c2cdoc.atlassian.net/browse/HRL-377) Modify redirectUrl ([`#93`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/93))
- [`HRL-377`](https://c2cdoc.atlassian.net/browse/HRL-377) Redirect to customer page when verify-email's token invalid ([`7fbbf37`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7fbbf3719c894b2969136dfa0047e29aa89efecb))
- [`HRL-377`](https://c2cdoc.atlassian.net/browse/HRL-377) Remove username ([`cb2228e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/cb2228e34f692f6d149e5dd98c245db309a2df14))
- [`HRL-379`](https://c2cdoc.atlassian.net/browse/HRL-379) [SERVER] API handle forgot password ([`#89`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/89))
- [`HRL-380`](https://c2cdoc.atlassian.net/browse/HRL-380) [BE] Customer can change their personal info ([`fc195c3`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fc195c35aeeeea44100544a03636535a68844bff))
- [`HRL-392`](https://c2cdoc.atlassian.net/browse/HRL-392) [SERVER] Remove APIs which related to role "STAFF" and login with salonId ([`#90`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/90))
- [`HRL-407`](https://c2cdoc.atlassian.net/browse/HRL-407) [`HRL-407`](https://c2cdoc.atlassian.net/browse/HRL-407) [BE] [Admin] can view the customer list and customer detail ([`e86e790`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e86e7908e478946749ca0a84961b1a0219ce1bbc))
- [`HRL-407`](https://c2cdoc.atlassian.net/browse/HRL-407) [BE] [Admin] can view the customer list and customer detail ([`#95`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/95))
- [`HRL-409`](https://c2cdoc.atlassian.net/browse/HRL-409) [BE] Customer can add/remove their credit card ([`ef454fd`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ef454fddc803634f4995ebfbe22898e7dd714900))
- [`HRL-409`](https://c2cdoc.atlassian.net/browse/HRL-409) Add VT4G env params ([`#101`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/101))
- [`HRL-409`](https://c2cdoc.atlassian.net/browse/HRL-409) Fix add card error ([`#102`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/102))
- [`HRL-409`](https://c2cdoc.atlassian.net/browse/HRL-409) Hide 2 more digit in card number ([`#112`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/112))
- [`HRL-416`](https://c2cdoc.atlassian.net/browse/HRL-416) [Customer] [BE] Update email content for a new activation link when the previous link has expired ([`#99`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/99))
- [`HRL-422`](https://c2cdoc.atlassian.net/browse/HRL-422) [BE] Improve Parse server: no use Parse.Object.extend, only Parse.User or _User className ([`#103`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/103))
- [`HRL-429`](https://c2cdoc.atlassian.net/browse/HRL-429) [Customer] Update e-mail content ([`#110`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/110))
- [`HRL-431`](https://c2cdoc.atlassian.net/browse/HRL-431) [Improvement] Forgot password email: Check user role ([`#111`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/111))
- [`HRL-431`](https://c2cdoc.atlassian.net/browse/HRL-431) Add userQuery.select('role') ([`c72409e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/c72409e83c4d28535a572d10df05198451768f04))
- [`HRL-438`](https://c2cdoc.atlassian.net/browse/HRL-438) [BE] [web] [mobile] Force complete customer profile after first login ([`5b21c1a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5b21c1a3f2a2d727d266375af7e12682e5adcd80))
- Add fullName and phoneticFullName for customer ([`#97`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/97))
- Allows admin to getCardList ([`#107`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/107))
- Change invalid user error code 210 ([`#105`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/105))
- Correct updateCustomerInfo in api doc ([`4f367ae`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/4f367ae4185aacf6f8b18c42e30afc483f443065))
- Get cardList in getCustomerDetail for role ADMIN ([`#108`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/108))
- Hr[`L-377`](https://c2cdoc.atlassian.net/browse/L-377) Modify redirectUrl ([`4a1fb3e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/4a1fb3e81c69011b6c154f4e302111f849b22501))
- Modify verify-email's content ([`94527c5`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/94527c5f7a86b64a89ab7fea8c8a6de698cdac95))
- Remove address and postal code for customer ([`#96`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/96))
- Reset-password-token expire after 2h ([`#109`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/109))
- Update migration file ([`#100`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/100))
- Use / instead of - for birthDate ([`#106`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/106))

## v0.2.0
[2020-11-05]

### Fixes

- Fix migration warning ([`dfadd62`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/dfadd62e05a1b1b26e6bb3f4f55818f9e306fdc4))

### Others

- [`HRL-153`](https://c2cdoc.atlassian.net/browse/HRL-153) Session expire within 3 day ([`f3f8c14`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/f3f8c148b7c206b0af870d1b5515f3f7c0763e22))
- [`HRL-229`](https://c2cdoc.atlassian.net/browse/HRL-229) Improve SNS link format ([`294c516`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/294c516f101bbb3baabe6464dce03d4fb43f2002))
- [`HRL-253`](https://c2cdoc.atlassian.net/browse/HRL-253) Salon Operator can register 2 types of products ([`8fa5a64`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8fa5a64660e00f0a8674f0cd0b85049536c39543))
- [`HRL-253`](https://c2cdoc.atlassian.net/browse/HRL-253) Show product's price only when type is USER ([`#78`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/78))
- [`HRL-268`](https://c2cdoc.atlassian.net/browse/HRL-268) Update Salon address in Create new salon ([`7b69d36`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7b69d36d99f48cbef29ac9a949f7754023dc48a9))
- [`HRL-272`](https://c2cdoc.atlassian.net/browse/HRL-272) [BE] Salon Operator can Publish/Unpublish Stylist Profile ([`#58`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/58))
- [`HRL-319`](https://c2cdoc.atlassian.net/browse/HRL-319) Allow search with special chars by using escapeRegExp ([`#76`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/76))
- [`HRL-325`](https://c2cdoc.atlassian.net/browse/HRL-325) Add yup's stripUnknown option for all API ([`#73`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/73))
- [`HRL-325`](https://c2cdoc.atlassian.net/browse/HRL-325) Fix error uploadImage by adding shape ([`#75`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/75))
- [`HRL-330`](https://c2cdoc.atlassian.net/browse/HRL-330) [BE] [web, mobile] [Salon] Update rule for special characters of salon name ([`#80`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/80))
- [`HRL-330`](https://c2cdoc.atlassian.net/browse/HRL-330) Applied for salonNameKatakana ([`#82`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/82))
- [`HRL-330`](https://c2cdoc.atlassian.net/browse/HRL-330) Forbidden all special characters except -._ ([`#83`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/83))
- [`HRL-349`](https://c2cdoc.atlassian.net/browse/HRL-349) [BE][Edit salon profile] Number of seats 席数 is required on web ([`8fd110e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8fd110eae491a32fd0187a2055ca4b7555707915))
- [`HRL-349`](https://c2cdoc.atlassian.net/browse/HRL-349) [Server][Edit salon profile] Number of seats 席数 is required on web ([`#79`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/79))
- Add migration file to update product type ([`7b64bb1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7b64bb105c9c3bd11663fea32a8489cacc1dc22a))
- Add postalCode to DefaultSelectFields.SALON and api doc ([`#72`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/72))
- Add salonAddress4 to DefaultSelectFields.SALON ([`#74`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/74))
- Add yup's stripUnknown option for all API ([`141677e`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/141677e2429ae106af9f14747575600fdc150fb7))
- Increase id of some migrations file ([`#66`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/66))
- Remove unused columns ([`#69`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/69))

## v0.1.0
[2020-10-22]

### Features

- feature/[`HAIR-20`](https://c2cdoc.atlassian.net/browse/HAIR-20) - Sprint 2 ([`#2`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/2))
- Feature/[`HAIR-88`](https://c2cdoc.atlassian.net/browse/HAIR-88) ([`#41`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/41))
- Feature/pipeline ([`#4`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/4))
- Feature/pipeline ([`#3`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/3))
- Feature/sprint3 ([`#23`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/23))

### Fixes

- Fix bug getMenuItemList ([`#48`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/48))
- Fix bug login API: verify role before login ([`#16`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/16))
- Fix bug product query with status ([`#63`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/63))
- Fix bug updateSalonInfo & update API doc ([`651279d`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/651279d41038fc59fa6c4f7c944233c1712d7ecb))
- Fix format ([`a7b9290`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a7b9290013184b886a098fdb95a1803c941167fb))
- fix pagging sort errors ([`#26`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/26))
- Fix rename file ([`3d75bf7`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3d75bf77a2a1ddd478f11d817706aa5541562938))
- Fix template mail ([`#64`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/64))
- Fixbug adminUpdateSalonInfo ([`#36`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/36))

### Others

- .gitignore created online with Bitbucket ([`9082c4f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9082c4fe9a32b9cf98e55bea4f5e67b09bd0298d))
- [`HAIR-12`](https://c2cdoc.atlassian.net/browse/HAIR-12) [`HAIR-13`](https://c2cdoc.atlassian.net/browse/HAIR-13) [`HAIR-21`](https://c2cdoc.atlassian.net/browse/HAIR-21) [`HAIR-22`](https://c2cdoc.atlassian.net/browse/HAIR-22) Update API doc, modify holidays requirement ([`1cd31ff`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1cd31ffe82a6c86b647076ff134180fdcbcfd286))
- [`HAIR-14`](https://c2cdoc.atlassian.net/browse/HAIR-14), [`HAIR-27`](https://c2cdoc.atlassian.net/browse/HAIR-27) Change error message in API changePassword ([`50f3068`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/50f306893990f15384007a9bb76fd6f7f7fc07a0))
- [`HAIR-161`](https://c2cdoc.atlassian.net/browse/HAIR-161) APIs for Customer page ([`#44`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/44))
- [`HAIR-177`](https://c2cdoc.atlassian.net/browse/HAIR-177) API renewSession ([`#43`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/43))
- [`HAIR-205`](https://c2cdoc.atlassian.net/browse/HAIR-205) [`HAIR-206`](https://c2cdoc.atlassian.net/browse/HAIR-206) Update APIs and Add updateMenuPublishStatus ([`#45`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/45))
- [`HAIR-205`](https://c2cdoc.atlassian.net/browse/HAIR-205) [`HAIR-207`](https://c2cdoc.atlassian.net/browse/HAIR-207) [`HAIR-195`](https://c2cdoc.atlassian.net/browse/HAIR-195) ([`901c09a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/901c09a0627dd00d82891baefd27d87e01927eb7))
- [`HAIR-21`](https://c2cdoc.atlassian.net/browse/HAIR-21) [`HAIR-22`](https://c2cdoc.atlassian.net/browse/HAIR-22) [`HAIR-13`](https://c2cdoc.atlassian.net/browse/HAIR-13) [`HAIR-12`](https://c2cdoc.atlassian.net/browse/HAIR-12) add create, edit, get list, get details APIs for salons ([`#10`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/10))
- [`HAIR-21`](https://c2cdoc.atlassian.net/browse/HAIR-21) update api to avoid user creation when provided email address is duplicated ([`#20`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/20))
- [`HAIR-22`](https://c2cdoc.atlassian.net/browse/HAIR-22) ([`#19`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/19))
- [`HAIR-22`](https://c2cdoc.atlassian.net/browse/HAIR-22) Add email & salonStaffsNumber in salon list ([`393810a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/393810aa106935e0b5b84a81101f79be78241906))
- [`HAIR-24`](https://c2cdoc.atlassian.net/browse/HAIR-24) [`HAIR-25`](https://c2cdoc.atlassian.net/browse/HAIR-25) update trigger logic, fix PR comments ([`16100a4`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/16100a4dc571333b53a535ed0fec37b73ede887e))
- [`HAIR-24`](https://c2cdoc.atlassian.net/browse/HAIR-24), [`HAIR-25`](https://c2cdoc.atlassian.net/browse/HAIR-25) Redirect reset password page to admin & salon dashboard link and update route path ([`#17`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/17))
- [`HAIR-24`](https://c2cdoc.atlassian.net/browse/HAIR-24), [`HAIR-25`](https://c2cdoc.atlassian.net/browse/HAIR-25) update reset password template, add new registration confirtmation template and trigger ([`#12`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/12))
- [`HAIR-26`](https://c2cdoc.atlassian.net/browse/HAIR-26) Add forgot salonId api ([`b6a03e6`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b6a03e663dd11313b5dacd252a336eabe96b1360))
- [`HAIR-26`](https://c2cdoc.atlassian.net/browse/HAIR-26) Forgot salonId ([`#14`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/14))
- [`HAIR-26`](https://c2cdoc.atlassian.net/browse/HAIR-26) update forgot salonId api ([`#15`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/15))
- [`HAIR-39`](https://c2cdoc.atlassian.net/browse/HAIR-39) add admin update APIs ([`#13`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/13))
- [`HAIR-39`](https://c2cdoc.atlassian.net/browse/HAIR-39) admin update salon without modifying image ([`#27`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/27))
- [`HAIR-51`](https://c2cdoc.atlassian.net/browse/HAIR-51) [`HAIR-108`](https://c2cdoc.atlassian.net/browse/HAIR-108) Menu management APIs ([`#39`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/39))
- [`HAIR-76`](https://c2cdoc.atlassian.net/browse/HAIR-76) Add token expired error ([`abdaa40`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/abdaa40329f9305489804c4e217e5729b428ff59))
- [`HAIR-76`](https://c2cdoc.atlassian.net/browse/HAIR-76) Return Parse response format for reset password API ([`#24`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/24))
- [`HAIR-77`](https://c2cdoc.atlassian.net/browse/HAIR-77) Stylist management APIs ([`ada8464`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/ada84644d803580f0d9f7ea7d961da4cb7114262))
- [`HAIR-80`](https://c2cdoc.atlassian.net/browse/HAIR-80) Upload Image router and Fixbug create Salon ([`#21`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/21))
- [`HAIR-81`](https://c2cdoc.atlassian.net/browse/HAIR-81) [`HAIR-82`](https://c2cdoc.atlassian.net/browse/HAIR-82) [`HAIR-83`](https://c2cdoc.atlassian.net/browse/HAIR-83) category management APIs ([`8d24eee`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8d24eeeb5d0f7b63c1177abe06f32bd3b6c0ef12))
- [`HAIR-81`](https://c2cdoc.atlassian.net/browse/HAIR-81) [`HAIR-82`](https://c2cdoc.atlassian.net/browse/HAIR-82) [`HAIR-83`](https://c2cdoc.atlassian.net/browse/HAIR-83) update PR with fixes ([`5b97b4b`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/5b97b4b6c6a219a0f668b813eb488cc04e444554))
- [`HAIR-81`](https://c2cdoc.atlassian.net/browse/HAIR-81), [`HAIR-82`](https://c2cdoc.atlassian.net/browse/HAIR-82), [`HAIR-83`](https://c2cdoc.atlassian.net/browse/HAIR-83) Category management APIs ([`#22`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/22))
- [`HAIR-88`](https://c2cdoc.atlassian.net/browse/HAIR-88) ([`fec8b02`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fec8b023e95224d24ff1d4b6d50bd9e4ae980969))
- [`HAIR-88`](https://c2cdoc.atlassian.net/browse/HAIR-88) Post management APIs ([`#35`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/35))
- [`HAIR-90`](https://c2cdoc.atlassian.net/browse/HAIR-90) [`HAIR-91`](https://c2cdoc.atlassian.net/browse/HAIR-91) [`HAIR-92`](https://c2cdoc.atlassian.net/browse/HAIR-92) [`HAIR-93`](https://c2cdoc.atlassian.net/browse/HAIR-93) Menu management APIs ([`15a8245`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/15a8245770fd451c37250a30dd02ba02362d21a5))
- [`HAIR-94`](https://c2cdoc.atlassian.net/browse/HAIR-94) Product management APIs and some fixes on Stylist APIs ([`#31`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/31))
- [`HAIRLIE-55`](https://c2cdoc.atlassian.net/browse/HAIRLIE-55) fix update menu with duplicated name ([`#33`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/33))
- [`HRL-152`](https://c2cdoc.atlassian.net/browse/HRL-152) Add field Salon Name in Katakana ([`fdaba39`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/fdaba3983c4b3528b5ddac867821c1f61678d207))
- [`HRL-171`](https://c2cdoc.atlassian.net/browse/HRL-171) Fix bug in convertParseObjectToJson ([`#47`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/47))
- [`HRL-171`](https://c2cdoc.atlassian.net/browse/HRL-171) Update publish / unpublish category & menu logic ([`e7f9db1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/e7f9db15de81016bb636930370d7f5b805f91dc7))
- [`HRL-225`](https://c2cdoc.atlassian.net/browse/HRL-225) Implement email logic ([`a4f0539`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a4f0539abc45a7f34aad3109b693718fa245783f))
- [`HRL-24`](https://c2cdoc.atlassian.net/browse/HRL-24) Update .env.stg ([`b26bc85`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/b26bc8517b569d0c6cb8f455b34f503c630dc6a5))
- [`HRL-245`](https://c2cdoc.atlassian.net/browse/HRL-245) Add limit params and its default is 10 ([`a565eb0`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/a565eb0d3ea696a1d0d08bf0b9a675332746a915))
- [`HRL-245`](https://c2cdoc.atlassian.net/browse/HRL-245) Get only 8 post in customerGetStylistDetailPage ([`#50`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/50))
- [`HRL-255`](https://c2cdoc.atlassian.net/browse/HRL-255) Implement migration db script ([`2ddd824`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/2ddd824bd2a0fce1675ccda5e2de24e3db6f2db1))
- [`HRL-270`](https://c2cdoc.atlassian.net/browse/HRL-270) [web] Update some feedback from JP team ([`6dc92c1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/6dc92c1bb7086ac325d6dc416be76c0a7b91f2fe))
- [`HRL-270`](https://c2cdoc.atlassian.net/browse/HRL-270) Change min of profileImages = 0 and update apidoc ([`4de0e2a`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/4de0e2ab3718f6452ddd73f22201e9199d4a732d))
- Add .env.stg and update ecosystem ([`#62`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/62))
- Add API doc, revise PR according to comments ([`8fc1e43`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8fc1e43f0027de4fc832c46607e82b389b700565))
- Add config email ([`#6`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/6))
- Add integer validation for number ([`8bb4433`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/8bb44336f1a6b144428a6ab5538048f660d969fc))
- Add migration file for _User's salonName ([`29d4956`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/29d495662beefec7e49f2ac413a86cc93ea2c4fa))
- Add more info in salon login return ([`#29`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/29))
- Add native mongoDB ([`#9`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/9))
- Add salonPayments ([`#70`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/70))
- Add select to query updateSalonInfo ([`#37`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/37))
- Add stripUnkown option for yup ([`#71`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/71))
- Bug/[`HRL-294`](https://c2cdoc.atlassian.net/browse/HRL-294) ([`1be9ad9`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/1be9ad9a6f9193d1ff88af5bb12a64aee8790b20))
- Downgrade package helmet & parse server ([`#42`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/42))
- Enable s3 config ([`044073f`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/044073fd6acaf69615ba503954a09fa41dbcea09))
- Init Parse server 4.2 ([`#1`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/1))
- Refactor code ([`eb40ec6`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/eb40ec6e309b1c28b5ce4fe0757fa3ec938f1ce2))
- Remove status field in updateCategory API ([`9914b09`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/9914b09823975867eef8e5ff575ca6b2e9e2087d))
- Search with regex and in many fields ([`#65`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/65))
- Setup pipeline for DEV env ([`7715ea1`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7715ea181b4606d28cbf2e06e62d2272ee672c4a))
- Update afterSaveImage ([`#40`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/40))
- Update APIdoc salon list, detail & update salon ([`3f36439`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/3f36439b3dda69fbcab5070886bb80bc47837e05))
- Update DEV env: fix domain & url ([`#5`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/5))
- Update email host ([`#7`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/7))
- Update image func ([`#34`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/34))
- Update paging, login message ([`7c67ebf`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/7c67ebf64f5fcb7a02185e9aca8422878d429db9))
- Update pm2 config: add apidoc ([`#11`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/11))
- Update S3 config for DEV env ([`#8`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/8))
- Update Salon APIs ([`#32`](https://bitbucket.org/hidesignsJP/hairlie-server/pull-requests/32))
- Upgrade & remove unused packages and config eslint ([`514b8ca`](https://bitbucket.org/hidesignsJP/hairlie-server/commits/514b8caed41e296ed0c136ad0ed60bbaa943b168))
