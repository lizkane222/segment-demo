const campaignData = [
    {
        utm: {
            campaignId: 'xyz123',
            campaign: 'Summer Sale',
            campaignSource: 'google',
            campaignMedium: 'cpc',
            campaignTerm: 'beachwear',
            campaignContent: 'ad_variation_a',
            referrer: 'https://www.example-referring-site.com/blog/summer-fashion',
        },
        queryString: '?utm_campaign=Summer%20Sale&utm_source=google&utm_medium=cpc&utm_term=beachwear&utm_content=ad_variation_a&utm_id=xyz123&dr=https%3A%2F%2Fwww.example-referring-site.com%2Fblog%2Fsummer-fashion',
    },
    {
        utm: {
            campaignId: 'abc789',
            campaign: 'Winter Promo',
            campaignSource: 'facebook',
            campaignMedium: 'social',
            campaignTerm: 'ski%20gear',
            campaignContent: 'image_ad_1',
            referrer: 'https://www.another-referrer.net/page?someparam=value',
        },
        queryString: '?utm_campaign=Winter%20Promo&utm_source=facebook&utm_medium=social&utm_term=ski%2520gear&utm_content=image_ad_1&utm_id=abc789&dr=https%3A%2F%2Fwww.another-referrer.net%2Fpage%3Fsomeparam%3Dvalue',
    },
    {
        utm: {
            campaignId: 'efg456',
            campaign: 'Spring Collection',
            campaignSource: 'newsletter',
            campaignMedium: 'email',
            campaignTerm: 'newsletter',
            campaignContent: 'header_link',
            referrer: 'https://search.yahoo.com/search?p=autumn%20shoes',
        },
        queryString: '?utm_campaign=Spring%20Collection&utm_source=newsletter&utm_medium=email&utm_content=header_link&utm_id=efg456',
    },
    {
        utm: {
            campaignId: 'hij123',
            campaign: 'Autumn Deals',
            campaignSource: 'bing',
            campaignMedium: 'cpc',
            campaignTerm: 'fall%20fashion',
            campaignContent: 'dynamic_ad_v2',
            referrer: 'https://search.yahoo.com/search?p=autumn%20clothes',
        },
        queryString: '?utm_campaign=Autumn%20Deals&utm_source=bing&utm_medium=cpc&utm_term=fall%2520fashion&utm_content=dynamic_ad_v2&utm_id=hij123&dr=https%3A%2F%2Fsearch.yahoo.com%2Fsearch%3Fp%3Dautumn%2520clothes',
    },
    {
        utm: {
            campaignId: 'klm456',
            campaign: 'Black Friday Sale',
            campaignSource: 'email_list',
            campaignMedium: 'email',
            campaignTerm: 'promo',
            campaignContent: 'promo_banner',
            referrer: 'https://search.yahoo.com/search?p=autumn%20clothes',
        },
        queryString: '?utm_campaign=Black%20Friday%20Sale&utm_source=email_list&utm_medium=email&utm_content=promo_banner&utm_id=klm456',
    },
    {
        utm: {
            campaignId: 'nop789',
            campaign: 'Cyber Monday Deals',
            campaignSource: 'social_media',
            campaignMedium: 'instagram',
            campaignTerm: 'holiday%20gifts',
            campaignContent: 'story_swipe_up',
            referrer: 'https://www.instagram.com/my_brand/',
        },
        queryString: '?utm_campaign=Cyber%20Monday%20Deals&utm_source=social_media&utm_medium=instagram&utm_term=holiday%2520gifts&utm_content=story_swipe_up&utm_id=nop789&dr=https%3A%2F%2Fwww.instagram.com%2Fmy_brand%2F',
    },
    {
        utm: {
            campaignId: 'qrs123',
            campaign: 'New Year New You',
            campaignSource: 'affiliate',
            campaignMedium: 'referral',
            campaignTerm: '',
            campaignContent: 'blog_post_link',
            referrer: 'https://www.partner-website.com/articles/new-year-resolutions',
        },
        queryString: '?utm_campaign=New%20Year%20New%20You&utm_source=affiliate&utm_medium=referral&utm_content=blog_post_link&utm_id=qrs123&dr=https%3A%2F%2Fwww.partner-website.com%2Farticles%2Fnew-year-resolutions',
    },
    {
        utm: {
            campaignId: 'tuv456',
            campaign: 'Back to School',
            campaignSource: 'display_network',
            campaignMedium: 'banner_ad',
            campaignTerm: 'school%20supplies',
            campaignContent: 'animated_banner',
            referrer: 'https://www.partner-website.com/shop/',
        },
        queryString: '?utm_campaign=Back%20to%20School&utm_source=display_network&utm_medium=banner_ad&utm_term=school%2520supplies&utm_content=animated_banner&utm_id=tuv456',
    },
    {
        utm: {
            campaignId: 'wxy789',
            campaign: 'Summer Flash Sale',
            campaignSource: 'google',
            campaignMedium: 'cpc',
            campaignTerm: 'summer%20deals',
            campaignContent: 'responsive_search_ad',
            referrer: 'https://www.google.com/search?q=summer+sales',
        },
        queryString: '?utm_campaign=Summer%20Flash%20Sale&utm_source=google&utm_medium=cpc&utm_term=summer%2520deals&utm_content=responsive_search_ad&utm_id=wxy789&dr=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dsummer%2Bsales',
    },
    {
        utm: {
            campaignId: 'zab123',
            campaign: 'Holiday Gift Guide',
            campaignSource: 'social_media',
            campaignMedium: 'facebook',
            campaignTerm: 'christmas%20presents',
            campaignContent: 'video_ad',
            referrer: 'https://www.facebook.com/my_brand_page/',
        },
        queryString: '?utm_campaign=Holiday%20Gift%20Guide&utm_source=social_media&utm_medium=facebook&utm_term=christmas%2520presents&utm_content=video_ad&utm_id=zab123&dr=https%3A%2F%2Fwww.facebook.com%2Fmy_brand_page%2F',
    },
];

// Extract the `utm_campaign` or `utm_id` from the URL query string
// const campaignId = queryParams.get('utm_id') || queryParams.get('utm_campaign');

//   // Find the matching campaign from the campaignData array
// const matchedCampaign = campaignData.find(campaign => 
//     campaign.utm.campaignId === campaignId || campaign.utm.campaign === campaignId
// );

// function generateCampaignData() {
//     // Generate random index to select data
//     const randomIndex = Math.floor(Math.random() * campaignData.length);
//     return campaignData[randomIndex];
// }


// export { campaignData, generateCampaignData, matchedCampaign, campaignId };
export { campaignData };