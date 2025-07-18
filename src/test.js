

  async function submit() {
 
  try{var response =  await fetch("https://fiatdz.com/wp-json/contact-form-7/v1/contact-forms/570/feedback", {
    "body": "------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7\"\r\n\r\n570\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7_version\"\r\n\r\n5.9.8\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7_locale\"\r\n\r\nfr_FR\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7_unit_tag\"\r\n\r\nwpcf7-f570-p573-o1\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7_container_post\"\r\n\r\n573\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7_posted_data_hash\"\r\n\r\n\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7cf_hidden_group_fields\"\r\n\r\n[\"raison-sociale\"]\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7cf_hidden_groups\"\r\n\r\n[\"group-1\"]\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7cf_visible_groups\"\r\n\r\n[]\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7cf_repeaters\"\r\n\r\n[]\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7cf_steps\"\r\n\r\n{}\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7cf_options\"\r\n\r\n{\"form_id\":570,\"conditions\":[{\"then_field\":\"group-1\",\"and_rules\":[{\"if_field\":\"vous-etes\",\"operator\":\"equals\",\"if_value\":\"Professionnel\"}]},{\"then_field\":\"-1\",\"and_rules\":[{\"if_field\":\"vous-etes\",\"operator\":\"equals\",\"if_value\":\"Professionnel\"}]}],\"settings\":{\"animation\":\"yes\",\"animation_intime\":200,\"animation_outtime\":200,\"conditions_ui\":\"normal\",\"notice_dismissed\":false}}\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"_wpcf7_recaptcha_response\"\r\n\r\n03AFcWeA535BlYYhHcr2te3xOmDeAi8KavpYqE6roNaW4jW_Gtns1CLvAoOOWe21L-g9GAjEC2ft_Yk0Mzm9GGgISHK1S4kLP71lmKsPpfzOp4VZV8tceRAw7cUf0ZsLTNqmZperICAtsQObyeV1QeDoFvpeEFL8sHK--I9_1_OWy0aSQsD3-Ed3nSl4ex1XGTDdvZVAbIiep0fa3mzjOp0kOboEmGfyjGMItobPBoC9LM7xx2NsB0v2umXXL150mTnE5HMH0xfNpUckcVDBw1QXfE8tkKkZK6HeJAEkIwSu756UXc_l4ZjL4keA46WdiLN3IXYFdRgVig1xgrEI2C7I2ZUL60yIYoQkceP4VgIMoYd7fv9FclWXm1ZVzeM1pWseaeyfhuXGKrijy4oZt5zOtaFLnaFrmg6B-WVY5n03cq6EI5QK8li0QGLbhnDFK_z7BZT9fu6R_fs5zkhH-R1stFvuvteNcZTzhsMVje4d1qIFTH_7bYmWOnMfxuOOzGzdsGAjveh8634WEkbazLPbVguL_bOqYsRiOWcTOtmJpprLmnXRPOo9SCL6M3s0OKI7daHd688jnaTpm0Bfe8KSs5I5D15_4lagMUdfoRdfS0PyzAhZRzvfUSf0azFmjhRmtodCY7-edu1m-1teqZsSWjxm-r8F_uPoqSeIEIk40eBaFZpbHlSLjd5Nmu7PbekmxUMAmQHqJ1jtMFDgGXD-sZLj7rLtGv0FIGhXvJe_6Zapas5p_rK7gYZIT_oOZD10JVev7Hb7udepllNeJtCEDHLtms9PaC6R-XbPfZcksXBqwXnM5wEX4dTIxBBqVA7GispIaNXwOB5H4jLQHUE4bHrOFtSISxlztiarKBGUZtHq2xcmBzeDrfwl9MntIzXG-ng0m39Bg2ZSpK5DIVpPDLHg02FNwC2V7_F9TYo9AGnLi6jYQprpq3utrjK6Oq6RnW3UkvirOr3i5MSHFCY-KaVTD_0PycBR7S6_J2MRI07AnbMgEY5LVaDEvCmMAv8MGdRhDhg21zc14eUV71Qo-hMHAeFyvL66wpeefW2WKncsFqugAY3B_4n6SFLgpZ8ae6hKE0eqqWsqSEAm7HRbwwMRDg3Z4VxBymiy9zCT5k0KEyp1i10DGu_Od7Qw9XxOJ52MkuNjXehfyOgfqEk5K8giL5tMbGahS456cJyOf7Webn9_x9V3tVsrHeeTpFMVUWFKVl9JNdTc38lF8_Htfm1eGFgMbvvEOzB2bW-DYCT4I-fsxLJnmkR_M6iPTBMvroroVepDcNvo6XkDDTZcEsulhyyhfxtFE_ARz8vq2sjHpE5X9JefA7-zFdVGUOicPDe6xp5TDJjpUtucrX15xD1I4YC3ePNa57WQ18V6UVHlKRnBRznuSpWED1KXaKfJDvv-3n5-k55vL7pan_3QrYLT38ry1OAbzxXSz2j6opTtADivkwsvya0vaVThYj5NyrlThvUTYizn4v44b0pVWIvZQIqV0up7U8VUUoSuaUvmOYIyL_ucXbdxOYNhkBzFUJ7zZrY1LXGlU4U3Lb1ilES3Nqwcf-eJIOuu9BcRsDcZ9C5SN_iXubbQxLSJkA9mTrXhl-0iWxqG6wQGSoic1Z_fto31vIQx5m8di8HzcUidhZrS9E7fS96ctcyk8ImzwGewoBh_fTb4OC-1NHpdidh0pvzVCZTbD6bWRBfo1wijQNvyLswFWdjAS3077PWfm77aoyXei_hLaxGBwbHA-XnthAtRs-5olcY_njbKGAiPY1J1L2dZ0X2FSBuJSqVPdo5Q1z_a_8ttLgvXrh-ONSKHw2b6DrMSCMVws-TtesVDa2zp5igRqgvQMknrp1bQlMC9JJcVHV6U3-gdFf80vtooHrb5zcqotIYNrvrj8yQxsRk5MqO-nZP-zH5ITBEj83IvQn8xmDnh-gKPh1NLeRJGArr4u-yAvQYybFrLS28-m0MHztUhOo2YNLO534vXii_CyqQEeuamFtpFXAFFfs_v1PsxwY8gSKmyuBtk1ikdgmYK8gCfo_erb1ySICaCbyaKNm7z9W91T43XpmQJb_w7xOFWECShiW3Ja5iCbNewRduwCPSPqOTY7MDR1UrCGpHKGxM1OJVFH_PpOREecNOl-W4iluEfiI-FY8CiZ86DVJyWHJYkJDpaEUzQ6wGfVHFPnGvKWWUwFEX0kpP98uXQcBlIOrCstg0cKpQrXFUg5PkjiRe9HC7Em_tF5c1wKvgvF35J_oFKm8adfBy17cOaaoAjNHT0wSHCPpgfp0ryASTPUjbfZRfdSTwmFcBae4-_fNlwNrNn_vAjuR3PH5KjV4zfwFNQ\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"vous-etes\"\r\n\r\nParticulier\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"your-name\"\r\n\r\nmohamed\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"prenom\"\r\n\r\ndebar\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"phone\"\r\n\r\n0780082023\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\ndebar@gmail.com\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"Wilaya\"\r\n\r\n16 - Alger\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"Modeles\"\r\n\r\nNEW DOBLÒ PANORAMA CULT MADE IN ALGERIA\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"concessionaire\"\r\n\r\nSARL TALHA AUTO EUCALYPTUS\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"raison-sociale\"\r\n\r\n\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"msg\"\r\n\r\nmerci\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT\r\nContent-Disposition: form-data; name=\"acceptance-617\"\r\n\r\n1\r\n------WebKitFormBoundarymm1G4iXzgU7D1xtT--\r\n",
    "cache": "default",
    "credentials": "omit",
    "headers": {
        "Accept": "application/json, */*;q=0.1",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarymm1G4iXzgU7D1xtT",
    },
    "method": "POST",
    "mode": "cors",
    "redirect": "follow",
    "referrer": "https://fiatdz.com/panorama/",
    "referrerPolicy": "strict-origin-when-cross-origin"
})

  const text = await response.text();

  console.log("response = ", text);
  
 
  console.log("\n\n",response);
  

  if(response.status === 500) {
    return false
  } else {
    return true
  }}catch (error) {
    console.error(error);
  }

  
}

async function checkAndSubmit() {
    const submitted = await submit();  // Call the existing submit function
    
    if (!submitted) {  // If submission was not successful
      console.log("Submission failed, retrying...");
      checkAndSubmit();  // Recall checkAndSubmit until success
    } else {
      console.log("Submission successful!");
    }
  }


  checkAndSubmit();