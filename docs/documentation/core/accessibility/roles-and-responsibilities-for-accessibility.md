1.  [Home](/docs/core/contents)
2.  [Accessibility](/docs/core/accessibility/overview)
3.  [Roles and responsibilities for accessibility](#)

# Roles and responsibilities for accessibility

Everyone that is involved in commissioning or delivering digital products for Essex County Council shares responsibility to make sure that they are accessible to all.

The Government Digital Service Standards make it clear that we should:
- [understand users and their needs](https://www.gov.uk/service-manual/service-standard/point-1-understand-user-needs)
- [make the service simple to use](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use)
- [make sure everyone can use the service – after all, users often don’t have a choice](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service)

The following guidance is for specific roles:
- [user researcher](#user-researcher)
- [content designer or editor](#content-designer)
- [developers](#developers)
- [product owners and delivery managers](#product-owners-and-delivery-managers)
- [working in an agile team](#agile-phases)
- [procurement](#procurement)

## User researcher

The user researcher role is an important one as they help to identify accessibility issues by testing with disabled users. 

See [Government Digital Service (GDS) guidance on including users with disabilities](https://www.gov.uk/service-manual/user-research/find-user-research-participants).

It’s important to understand the challenges faced by users with specific disabilities or impairments. 

GDS have developed personas which identify the range of challenges faced by users. See the profiles:

- [Ashleigh: partially sighted screenreader user](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/ashleigh-partially-sighted-screenreader-user)
- [Christopher: user with rheumatoid arthritis](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/christopher-user-with-rheumatoid-arthritis)
- [Claudia: partially sighted screen magnifier user](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/claudia-partially-sighted-screen-magnifier-user)
- [Pawel: user with Asperger's](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/pawel-user-with-aspergers)
- [Ron: older user with multiple conditions](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/ron-older-user-with-multiple-conditions)
- [Saleem: profoundly deaf user](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/saleem-profoundly-deaf-user)
- [Simone: dyslexic user](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/simone-dyslexic-user)

### Testing

There are a number of assistive technologies which can be bought or downloaded for free. These help to identify issues early on. GOV.UK has guidance on [testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies).

### Support for user researchers

See what [support is available for user researchers](/docs/core/accessibility/support-for-user-researchers).

Read the [‘accessibility and me’ blog post](https://accessibility.blog.gov.uk/category/accessibility-and-me/) which has interviews with people with access needs.

The [Web Accessibility Initiative](https://www.w3.org/WAI/people-use-web/user-stories/) also has stories of people with disabilities using the web which highlight the effect of accessibility barriers.

## Content designer

Watch a 3.5 minute video from GDS on [ways to make your content more accessible](https://www.youtube.com/watch?v=lYZJKr8CX_U&list=PL5tovFCB3CsD_7_yeY1n6W4rxYkIupUln&index=6).

See our [checklist for content designers and editors](checklist-for-content-editors) for more guidance.

### Writing content for specific impairments

See our guidance on [how to write content for specific impairments](/docs/core/accessibility/examples-of-how-to-write-content-for-specific-impairments).

### Content types: images on websites

See our [guidance on using images on websites](/docs/core/content/using-images).

Siteimprove has guidance on:

- [the importance of Alt Tags](https://support.siteimprove.com/hc/en-gb/articles/114094069371-The-importance-of-Alt-Tags)
- [image Alt text best practices](https://support.siteimprove.com/hc/en-gb/articles/115000013031-Accessibility-Image-Alt-text-best-practices)

WebAIM has guidance on [accessible images](https://webaim.org/techniques/images/).

Guidance on using images on social media is available including:
- [Twitter: making images accessible](https://help.twitter.com/en/using-twitter/picture-descriptions)
- [Instagram: adding alternative text](https://help.instagram.com/503708446705527)
- [Facebook: adding alternative text](https://www.facebook.com/help/214124458607871)

### Content types: text Headings

Content should always be structured on a web page or in a document. This means that it should always have a title which is a heading 1 or h1 in the code.

Anything more than a couple of paragraphs probably needs to have sub-headings. This helps the user to scan the content to find what they need. These sub-headings are heading 2 or h2 in the code.

See our [guidance on designing good content](/docs/core/content/designing-content).

See [WCAG guidance on headings](http://www.w3.org/WAI/tutorials/page-structure/headings/).

Read Nomensa's blog post on [structuring accessible content](https://www.nomensa.com/blog/2017/how-structure-headings-web-accessibility).

### Content types: videos

Digital Leaders has guidance on [how to make videos accessible](https://digileaders.com/how-create-accessible-videos/).

Sitepoint has guidance on [8 steps to creating accessible video](https://www.sitepoint.com/accessible-video/).

Dig inclusion has guidance on [what makes a video accessible](https://diginclusion.com/resources/what-makes-a-video-accessible/?cn-reloaded=1&cn-reloaded=1).

### Creating accessible documents

Provide content on a web page rather than as a PDF. If this isn’t possible then the following should be done as a minimum:
- write in plain English
- tag headings and other parts of the document properly, so screen readers can understand the page structure
- make sure you include alt text alongside non-decorative images, so people who cannot see them understand what they’re there for
- avoid using tables, except when you're presenting data

See our guidance on [creating accessible documents](/docs/core/accessibility/creating-an-accessible-pdf).

GDS has a blog on [why content should be published in HTML and not PDF](https://gds.blog.gov.uk/2018/07/16/why-gov-uk-content-should-be-published-in-html-and-not-pdf/).

### Consultations

A consultation with a broad audience should be made as accessible as possible using the different formats. With a narrower audience, consultations must offer an alternative version, if requested, within a reasonable timeframe.

GDS has a [blog post which gives accessibility advice for creating a consultation](https://gds.blog.gov.uk/2018/09/13/accessibility-advice-when-creating-a-uk-government-consultation/).

## Developers

GDS has guidance for developers including:

*   [Accessibility for developers: An introduction](https://www.gov.uk/service-manual/technology/accessibility-for-developers-an-introduction)
*   [HTML: a good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)  \- a Mozilla guide on using HTML to improve accessibility
*   [WAI-ARIA basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)  \- a Mozilla guide on using WAI-ARIA to improve accessibility
*   [Page structure concepts](https://www.w3.org/WAI/tutorials/page-structure/)  \- a W3 tutorial on using HTML and WAI-ARIA to improve navigation and orientation
*   [Forms concepts](https://www.w3.org/WAI/tutorials/forms/)  \- a W3 tutorial on making accessible forms
*   [Tables concepts](https://www.w3.org/WAI/tutorials/tables/)  \- a W3 tutorial on making accessible tables
*   [Writing CSS with accessibility in mind](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939)  \- using CSS to improve accessibility
*   [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9)  \- using JavaScript to improve accessibility
*   [WCAG 2 quick start guide](https://aduggin.github.io/wcag/), developed in the GDS accessibility community

See our [checklist for developers](/docs/core/accessibility/checklist-for-developers) for more guidance.

## Product owners and Delivery managers 

Embedding accessibility in your project.

See [section 5 of the GOV.UK Service Manual: make sure everyone can use the service](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service).  

## Agile phases

Everyone in an agile team plays a part in developing an accessible experience for the user. 

You need to consider accessibility throughout the agile phases. 

### Discovery

The GOV.UK Service Manual explains [how the discovery phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works).

GOV.UK also has guidance on [understanding disabilities and impaiments](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles).

### Alpha

The GOV.UK Service Manual explains [how the alpha phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works).

GOV.UK also has guidance on:
- [understanding WCAG 2.1](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag)
- [how to get an accessibility audit before moving into public beta phase](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility#getting-an-accessibility-audit)

### Beta

The GOV.UK Service Manual explains [how the beta phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-beta-phase-works). It also gives guidance on:
- [testing for accessibility](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility)
- [making your service more inclusive](https://www.gov.uk/service-manual/design/making-your-service-more-inclusive)

### Live

The GOV.UK Service Manual explains [how the live phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-live-phase-works).

## Procurement

GDS advises that procurement teams refer to the following guidance:
- [accessible ICT procurement kit](http://mandate376.standards.eu/)
- [make things accessible](https://www.gov.uk/guidance/make-things-accessible)





