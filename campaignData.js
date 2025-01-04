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
          campaignTerm: 'newyear',
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
{
  utm: {
    campaignId: "cmp_001",
    campaign: "Holiday_Sale",
    campaignSource: "google",
    campaignMedium: "cpc",
    campaignTerm: "holiday+sale",
    campaignContent: "ad_variant_a",
    referrer: "https://www.google.com/ads"
  },
  queryString: "?utm_campaign=Holiday_Sale&utm_source=google&utm_medium=cpc&utm_term=holiday+sale&utm_content=ad_variant_a&utm_id=cmp_001&dr=https%3A%2F%2Fwww.google.com%2Fads"
},
{
  utm: {
    campaignId: "cmp_002",
    campaign: "Summer_Discounts",
    campaignSource: "facebook",
    campaignMedium: "social",
    campaignTerm: "summer+offers",
    campaignContent: "carousel_ad_b",
    referrer: "https://www.facebook.com"
  },
  queryString: "?utm_campaign=Summer_Discounts&utm_source=facebook&utm_medium=social&utm_term=summer+offers&utm_content=carousel_ad_b&utm_id=cmp_002&dr=https%3A%2F%2Fwww.facebook.com"
},
{
  utm: {
    campaignId: "cmp_003",
    campaign: "Black_Friday",
    campaignSource: "linkedin",
    campaignMedium: "sponsored",
    campaignTerm: "black+friday+deals",
    campaignContent: "post_variant_c",
    referrer: "https://www.linkedin.com/posts"
  },
  queryString: "?utm_campaign=Black_Friday&utm_source=linkedin&utm_medium=sponsored&utm_term=black+friday+deals&utm_content=post_variant_c&utm_id=cmp_003&dr=https%3A%2F%2Fwww.linkedin.com%2Fposts"
},
{
  utm: {
    campaignId: "cmp_004",
    campaign: "Back_To_School",
    campaignSource: "twitter",
    campaignMedium: "social",
    campaignTerm: "school+supplies",
    campaignContent: "tweet_promo_d",
    referrer: "https://www.twitter.com/ads"
  },
  queryString: "?utm_campaign=Back_To_School&utm_source=twitter&utm_medium=social&utm_term=school+supplies&utm_content=tweet_promo_d&utm_id=cmp_004&dr=https%3A%2F%2Fwww.twitter.com%2Fads"
},
{
  utm: {
    campaignId: "cmp_005",
    campaign: "Spring_Cleaning",
    campaignSource: "bing",
    campaignMedium: "search",
    campaignTerm: "spring+cleaning",
    campaignContent: "banner_ad_e",
    referrer: "https://www.bing.com/search"
  },
  queryString: "?utm_campaign=Spring_Cleaning&utm_source=bing&utm_medium=search&utm_term=spring+cleaning&utm_content=banner_ad_e&utm_id=cmp_005&dr=https%3A%2F%2Fwww.bing.com%2Fsearch"
},
{
  utm: {
    campaignId: "cmp_006",
    campaign: "Valentine_Deals",
    campaignSource: "instagram",
    campaignMedium: "social",
    campaignTerm: "valentine+gifts",
    campaignContent: "story_ad_f",
    referrer: "https://www.instagram.com"
  },
  queryString: "?utm_campaign=Valentine_Deals&utm_source=instagram&utm_medium=social&utm_term=valentine+gifts&utm_content=story_ad_f&utm_id=cmp_006&dr=https%3A%2F%2Fwww.instagram.com"
},
{
  utm: {
    campaignId: "cmp_007",
    campaign: "Autumn_Sale",
    campaignSource: "youtube",
    campaignMedium: "video",
    campaignTerm: "autumn+offers",
    campaignContent: "video_ad_g",
    referrer: "https://www.youtube.com"
  },
  queryString: "?utm_campaign=Autumn_Sale&utm_source=youtube&utm_medium=video&utm_term=autumn+offers&utm_content=video_ad_g&utm_id=cmp_007&dr=https%3A%2F%2Fwww.youtube.com"
},
{
  utm: {
    campaignId: "cmp_008",
    campaign: "Easter_Bargains",
    campaignSource: "pinterest",
    campaignMedium: "social",
    campaignTerm: "easter+discounts",
    campaignContent: "pin_ad_h",
    referrer: "https://www.pinterest.com"
  },
  queryString: "?utm_campaign=Easter_Bargains&utm_source=pinterest&utm_medium=social&utm_term=easter+discounts&utm_content=pin_ad_h&utm_id=cmp_008&dr=https%3A%2F%2Fwww.pinterest.com"
},
{
  utm: {
    campaignId: "cmp_009",
    campaign: "New_Year_Savings",
    campaignSource: "snapchat",
    campaignMedium: "social",
    campaignTerm: "new+year+sales",
    campaignContent: "snap_ad_i",
    referrer: "https://www.snapchat.com"
  },
  queryString: "?utm_campaign=New_Year_Savings&utm_source=snapchat&utm_medium=social&utm_term=new+year+sales&utm_content=snap_ad_i&utm_id=cmp_009&dr=https%3A%2F%2Fwww.snapchat.com"
},
{
  utm: {
    campaignId: "cmp_010",
    campaign: "Winter_Clearance",
    campaignSource: "quora",
    campaignMedium: "display",
    campaignTerm: "winter+deals",
    campaignContent: "post_ad_j",
    referrer: "https://www.quora.com"
  },
  queryString: "?utm_campaign=Winter_Clearance&utm_source=quora&utm_medium=display&utm_term=winter+deals&utm_content=post_ad_j&utm_id=cmp_010&dr=https%3A%2F%2Fwww.quora.com"
},
{
  utm: {
    campaignId: "cmp_011",
    campaign: "Flash_Sale_Weekend",
    campaignSource: "google",
    campaignMedium: "cpc",
    campaignTerm: "flash+sale",
    campaignContent: "responsive_search_ad",
    referrer: "https://www.google.com/ads/flash-sale",
  },
  queryString: "?utm_campaign=Flash_Sale_Weekend&utm_source=google&utm_medium=cpc&utm_term=flash+sale&utm_content=responsive_search_ad&utm_id=cmp_011&dr=https%3A%2F%2Fwww.google.com%2Fads%2Fflash-sale",
},
{
  utm: {
    campaignId: "cmp_012",
    campaign: "Cyber_Savings",
    campaignSource: "reddit",
    campaignMedium: "social",
    campaignTerm: "cyber+monday",
    campaignContent: "post_ad_k",
    referrer: "https://www.reddit.com/r/deals/",
  },
  queryString: "?utm_campaign=Cyber_Savings&utm_source=reddit&utm_medium=social&utm_term=cyber+monday&utm_content=post_ad_k&utm_id=cmp_012&dr=https%3A%2F%2Fwww.reddit.com%2Fr%2Fdeals%2F",
},
{
  utm: {
    campaignId: "cmp_013",
    campaign: "Spring_Sale_2024",
    campaignSource: "email",
    campaignMedium: "newsletter",
    campaignTerm: "spring+deals",
    campaignContent: "email_banner",
    referrer: "https://www.example.com/spring-sale-newsletter",
  },
  queryString: "?utm_campaign=Spring_Sale_2024&utm_source=email&utm_medium=newsletter&utm_term=spring+deals&utm_content=email_banner&utm_id=cmp_013&dr=https%3A%2F%2Fwww.example.com%2Fspring-sale-newsletter",
},
{
  utm: {
    campaignId: "cmp_014",
    campaign: "Summer_Deals_Blast",
    campaignSource: "facebook",
    campaignMedium: "social",
    campaignTerm: "summer+offers",
    campaignContent: "video_ad",
    referrer: "https://www.facebook.com/summer-deals-page",
  },
  queryString: "?utm_campaign=Summer_Deals_Blast&utm_source=facebook&utm_medium=social&utm_term=summer+offers&utm_content=video_ad&utm_id=cmp_014&dr=https%3A%2F%2Fwww.facebook.com%2Fsummer-deals-page",
},
{
  utm: {
    campaignId: "cmp_015",
    campaign: "End_of_Year_Sale",
    campaignSource: "twitter",
    campaignMedium: "social",
    campaignTerm: "year+end+clearance",
    campaignContent: "tweet_ad",
    referrer: "https://www.twitter.com/brand-year-end",
  },
  queryString: "?utm_campaign=End_of_Year_Sale&utm_source=twitter&utm_medium=social&utm_term=year+end+clearance&utm_content=tweet_ad&utm_id=cmp_015&dr=https%3A%2F%2Fwww.twitter.com%2Fbrand-year-end",
},
{
    utm: {
        campaignId: 'cmp_016',
        campaign: 'Mega_March_Sale',
        campaignSource: 'google',
        campaignMedium: 'cpc',
        campaignTerm: 'march+discounts',
        campaignContent: 'ad_variant_z',
        referrer: 'https://www.google.com/search?q=march+sale',
    },
    queryString: '?utm_campaign=Mega_March_Sale&utm_source=google&utm_medium=cpc&utm_term=march+discounts&utm_content=ad_variant_z&utm_id=cmp_016&dr=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dmarch%2Bsale',
},
{
    utm: {
        campaignId: 'cmp_017',
        campaign: 'Exclusive_Easter_Offers',
        campaignSource: 'instagram',
        campaignMedium: 'social',
        campaignTerm: 'easter+deals',
        campaignContent: 'story_ad_y',
        referrer: 'https://www.instagram.com/easter-sale',
    },
    queryString: '?utm_campaign=Exclusive_Easter_Offers&utm_source=instagram&utm_medium=social&utm_term=easter+deals&utm_content=story_ad_y&utm_id=cmp_017&dr=https%3A%2F%2Fwww.instagram.com%2Feaster-sale',
},
{
    utm: {
        campaignId: 'cmp_018',
        campaign: 'Luxury_Labor_Day',
        campaignSource: 'linkedin',
        campaignMedium: 'sponsored',
        campaignTerm: 'labor+day+deals',
        campaignContent: 'post_ad_x',
        referrer: 'https://www.linkedin.com/labor-day-offers',
    },
    queryString: '?utm_campaign=Luxury_Labor_Day&utm_source=linkedin&utm_medium=sponsored&utm_term=labor+day+deals&utm_content=post_ad_x&utm_id=cmp_018&dr=https%3A%2F%2Fwww.linkedin.com%2Flabor-day-offers',
},
{
    utm: {
        campaignId: 'cmp_019',
        campaign: 'Halloween_Blowout',
        campaignSource: 'pinterest',
        campaignMedium: 'social',
        campaignTerm: 'halloween+costumes',
        campaignContent: 'pin_ad_w',
        referrer: 'https://www.pinterest.com/halloween-sale',
    },
    queryString: '?utm_campaign=Halloween_Blowout&utm_source=pinterest&utm_medium=social&utm_term=halloween+costumes&utm_content=pin_ad_w&utm_id=cmp_019&dr=https%3A%2F%2Fwww.pinterest.com%2Fhalloween-sale',
},
{
    utm: {
        campaignId: 'cmp_020',
        campaign: 'Thanksgiving_Treats',
        campaignSource: 'twitter',
        campaignMedium: 'social',
        campaignTerm: 'thanksgiving+specials',
        campaignContent: 'tweet_ad_v',
        referrer: 'https://www.twitter.com/thanksgiving-deals',
    },
    queryString: '?utm_campaign=Thanksgiving_Treats&utm_source=twitter&utm_medium=social&utm_term=thanksgiving+specials&utm_content=tweet_ad_v&utm_id=cmp_020&dr=https%3A%2F%2Fwww.twitter.com%2Fthanksgiving-deals',
},
{
    utm: {
        campaignId: 'cmp_021',
        campaign: 'Cyber_Monday_Magic',
        campaignSource: 'facebook',
        campaignMedium: 'social',
        campaignTerm: 'cyber+monday+offers',
        campaignContent: 'carousel_ad_u',
        referrer: 'https://www.facebook.com/cyber-monday',
    },
    queryString: '?utm_campaign=Cyber_Monday_Magic&utm_source=facebook&utm_medium=social&utm_term=cyber+monday+offers&utm_content=carousel_ad_u&utm_id=cmp_021&dr=https%3A%2F%2Fwww.facebook.com%2Fcyber-monday',
},
{
    utm: {
        campaignId: 'cmp_022',
        campaign: 'Winter_Warmers',
        campaignSource: 'google',
        campaignMedium: 'cpc',
        campaignTerm: 'winter+deals',
        campaignContent: 'responsive_ad_t',
        referrer: 'https://www.google.com/winter-sale',
    },
    queryString: '?utm_campaign=Winter_Warmers&utm_source=google&utm_medium=cpc&utm_term=winter+deals&utm_content=responsive_ad_t&utm_id=cmp_022&dr=https%3A%2F%2Fwww.google.com%2Fwinter-sale',
},
{
    utm: {
        campaignId: 'cmp_023',
        campaign: 'Spring_Spectacular',
        campaignSource: 'youtube',
        campaignMedium: 'video',
        campaignTerm: 'spring+specials',
        campaignContent: 'video_ad_s',
        referrer: 'https://www.youtube.com/spring-sales',
    },
    queryString: '?utm_campaign=Spring_Spectacular&utm_source=youtube&utm_medium=video&utm_term=spring+specials&utm_content=video_ad_s&utm_id=cmp_023&dr=https%3A%2F%2Fwww.youtube.com%2Fspring-sales',
},
{
    utm: {
        campaignId: 'cmp_024',
        campaign: 'Festive_Frenzy',
        campaignSource: 'reddit',
        campaignMedium: 'social',
        campaignTerm: 'festive+season+deals',
        campaignContent: 'post_ad_r',
        referrer: 'https://www.reddit.com/festive-deals',
    },
    queryString: '?utm_campaign=Festive_Frenzy&utm_source=reddit&utm_medium=social&utm_term=festive+season+deals&utm_content=post_ad_r&utm_id=cmp_024&dr=https%3A%2F%2Fwww.reddit.com%2Ffestive-deals',
},
{
    utm: {
        campaignId: 'cmp_025',
        campaign: 'End_of_Summer_Sale',
        campaignSource: 'linkedin',
        campaignMedium: 'sponsored',
        campaignTerm: 'summer+clearance',
        campaignContent: 'ad_variant_q',
        referrer: 'https://www.linkedin.com/summer-sale',
    },
    queryString: '?utm_campaign=End_of_Summer_Sale&utm_source=linkedin&utm_medium=sponsored&utm_term=summer+clearance&utm_content=ad_variant_q&utm_id=cmp_025&dr=https%3A%2F%2Fwww.linkedin.com%2Fsummer-sale',
}
];

// Export or use the campaignData as needed
// console.log(campaignData.length);


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