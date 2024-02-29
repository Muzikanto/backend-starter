export const APP_VALUES = {
  phone: '8148126998',
  email: 'sales@erienova.com',
  location: 'Erie, Pennsylvania',
  locationHref:
    'https://www.google.com/maps/place/2641+W+17th+St,+Erie,+PA+16505,+USA/@42.0971052,-80.1400056,17z/data=!3m1!4b1!4m6!3m5!1s0x88327fa600e727ed:0x787439b4ea5a1f0f!8m2!3d42.0971052!4d-80.1374253!16s%2Fg%2F11fk2mwnpy?entry=ttu',
  estimateHref: 'https://admin.erienova.com/uploads/How_to_measure_1a07546ddd.pdf',
  pdfHref: 'https://admin.erienova.com/uploads/product_care_535561f0d9.pdf',
  googleHref: 'https://g.page/r/Cbgy5gs3H4IIEAE',
  reviewsHref:
    'https://www.google.com/maps/place/Nova+Cabinets+Countertops+%26+Flooring+Lp/@42.0971052,-80.1374253,17z/data=!4m8!3m7!1s0x88327fe49ec4e0fd:0x8821f370be632b8!8m2!3d42.0971052!4d-80.1374253!9m1!1b1!16s%2Fg%2F11p00603mx?entry=ttu',
  facebookHref: 'https://www.facebook.com/YourErieNova',
};

export const APP_BACKEND_URL =
  typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BACKEND_URL_HTTP : process.env.NEXT_PUBLIC_BACKEND_URL;
export const APP_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
