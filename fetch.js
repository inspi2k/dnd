url = 'https://search.shopping.naver.com/api/search/all?eq=&frm=NVSHATC&iq=&origQuery='+keyword+'&pagingIndex='+pageIndex+'&pagingSize='+pageSize+'&productSet=total&query='+keyword+'&sort=rel&viewType=list&window=&xq='
refer_1p = 'https://search.shopping.naver.com/search/all?query='+keyword+'&cat_id=&frm=NVSHATC'
refer_2p = 'https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery='+keyword+'&pagingIndex='+(pageIndex-1)+'&pagingSize='+pageSize+'&productSet=total&query='+keyword+'&sort=rel&timestamp=&viewType=list'
fetch(url, {
    headers: { 
        'authority': 'search.shopping.naver.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': 'NNB=XFAKOM3FWBEGG; ASID=3d63aeda00000183d9845de40000005f; autocomplete=use; AD_SHP_BID=18; _ga=GA1.2.1834935952.1667395532; SHP_BUCKET_ID=3; NSCS=1; nid_inf=-1414768515; NID_JKL=FicUSGqv2v1SQhZ86S5KYd02RYYknV1144+ObRT4k5s=; NID_AUT=tClj21DEE4vFWK+w9nNPBu3hDbKtmXdnCP2c/6SJT4dEOkjDxncwG3QryGaHXvNa; nx_ssl=2; page_uid=iebcHwprvmZssctEsSRssssstGZ-310899; NID_SES=AAABpsDZBZctWXsLwPURtZVwkc/r0dCeLdhaP/0VK7tLeaAN5qUrwvNE710Il5LLRt95e1WW3pBmsu2P+/F6ICKeLzn/Wudao2b2qSkeiCN88Qd9HbST0rJF+NRmoBKg3Xtwt+2tWA360pJbCqz2IayUBbY9smr0CovQVygG7GZIw5OtlwG6F+Xy6jwHjIPNrhWycaax+bxluS4iTsw6CVcKS8gPobf6wQHjLWQdUM+IPkGxwIqdBEKmHm2REPus5zxNk2EscT1ovuloX70d5oFmNaZe+ZwJEBh6imQtj79Taj0IW/+LN7U354TrAeV+a4qskukOsTzyShVcOLWiczp4t1Us6gLqoTuATkVhrCz/x8+0t7rBkPgbKU3AK2PZ0BHKerz0396v8LN0dzeEpSK1LWYOTbm0OMieAAB66WSUPkN4MW6wHZKtsDclRzfbuFiAobiGZMm2e39tUVuyygTy5Ri+xsAQx96Oga1EH3+wg6DzWNkoqbsLCNgZvZxNr4UCiOe1+gi5h/GlM9LsoY614zjffp0NW4w2s3GGfdUiPguaDkgaeXNBxL8RSmkLcxcDzQ==; spage_uid=iebcHwprvmZssctEsSRssssstGZ-310899',
        'dnt': '1',
        'logic': 'PART',
        'referer': refer_1p,
        'sbth': '6bc7553b8fa3e04779448fd212e42bb42aead5286fdd970d56aeb7febdd7771e722135e7154a4df43c07ed6e235175b5',
        'sec-ch-ua': '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="114"',
        'sec-ch-ua-arch': '"arm"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version-list': '"Whale";v="3.21.192.22", "Not-A.Brand";v="8.0.0.0", "Chromium";v="114.0.5735.138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"macOS"',
        'sec-ch-ua-platform-version': '"13.6.0"',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Whale/3.21.192.22 Safari/537.36'
    }
});


// 3. 상품 crUrl 가져오기
let sec_ch_ua = '';
let sec_ch_full = '';
for (let i=0 ; i<navigator.userAgentData.brands.length ; i++) {
    if(i>0) sec_ch_ua += ', ';
    sec_ch_ua += '"'+navigator.userAgentData.brands[i].brand+'";v="'+navigator.userAgentData.brands[i].version+'"';
    sec_ch_full += '"'+navigator.userAgentData.brands[i].brand+'";v="'+navigator.userAgentData.brands[i].version+'.0.0.0"';
}
sec_ch_ua_mobile = navigator.userAgentData.mobile ? '?1' : '?0';
//console.log(sec_ch_ua);
fetch('https://search.shopping.naver.com/api/search/all?eq=&frm=NVSHATC&iq=&origQuery=%EC%82%BC%EA%B2%B9%EC%82%B4&pagingIndex=1&pagingSize=40&productSet=total&query=%EC%82%BC%EA%B2%B9%EC%82%B4&sort=rel&viewType=list&window=&xq=', {
    headers: { 
        'authority': 'search.shopping.naver.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        //'cookie': 'NNB=XFAKOM3FWBEGG; ASID=3d63aeda00000183d9845de40000005f; autocomplete=use; AD_SHP_BID=18; _ga=GA1.2.1834935952.1667395532; SHP_BUCKET_ID=3; NSCS=1; nid_inf=-1414768515; NID_JKL=FicUSGqv2v1SQhZ86S5KYd02RYYknV1144+ObRT4k5s=; NID_AUT=tClj21DEE4vFWK+w9nNPBu3hDbKtmXdnCP2c/6SJT4dEOkjDxncwG3QryGaHXvNa; nx_ssl=2; page_uid=iebcHwprvmZssctEsSRssssstGZ-310899; NID_SES=AAABpsDZBZctWXsLwPURtZVwkc/r0dCeLdhaP/0VK7tLeaAN5qUrwvNE710Il5LLRt95e1WW3pBmsu2P+/F6ICKeLzn/Wudao2b2qSkeiCN88Qd9HbST0rJF+NRmoBKg3Xtwt+2tWA360pJbCqz2IayUBbY9smr0CovQVygG7GZIw5OtlwG6F+Xy6jwHjIPNrhWycaax+bxluS4iTsw6CVcKS8gPobf6wQHjLWQdUM+IPkGxwIqdBEKmHm2REPus5zxNk2EscT1ovuloX70d5oFmNaZe+ZwJEBh6imQtj79Taj0IW/+LN7U354TrAeV+a4qskukOsTzyShVcOLWiczp4t1Us6gLqoTuATkVhrCz/x8+0t7rBkPgbKU3AK2PZ0BHKerz0396v8LN0dzeEpSK1LWYOTbm0OMieAAB66WSUPkN4MW6wHZKtsDclRzfbuFiAobiGZMm2e39tUVuyygTy5Ri+xsAQx96Oga1EH3+wg6DzWNkoqbsLCNgZvZxNr4UCiOe1+gi5h/GlM9LsoY614zjffp0NW4w2s3GGfdUiPguaDkgaeXNBxL8RSmkLcxcDzQ==; spage_uid=iebcHwprvmZssctEsSRssssstGZ-310899',
        //'dnt': '1',
        'logic': 'PART',
        //'referer': 'https://search.shopping.naver.com/search/all?query=%EC%82%BC%EA%B2%B9%EC%82%B4&cat_id=&frm=NVSHATC',
        'sbth': '6bc7553b8fa3e04779448fd212e42bb42aead5286fdd970d56aeb7febdd7771e722135e7154a4df43c07ed6e235175b5',
        'sec-ch-ua': sec_ch_ua,
        //'sec-ch-ua': '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="114"',
        'sec-ch-ua-arch': '"arm"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version-list': sec_ch_ua_full,
        //'sec-ch-ua-full-version-list': '"Whale";v="3.21.192.22", "Not-A.Brand";v="8.0.0.0", "Chromium";v="114.0.5735.138"',
        'sec-ch-ua-mobile': sec_ch_ua_mobile,
        //'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"'+navigator.userAgentData.platform+'"',
        //'sec-ch-ua-platform': '"macOS"',
        'sec-ch-ua-platform-version': '"13.6.0"',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent' : navigator.userAgent
        //'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Whale/3.21.192.22 Safari/537.36'
    }
});


// result는 response임
result = fetch('https://msearch.shopping.naver.com/api/search/all?frm=NVSHSRC&origQuery=%EB%B0%80%ED%81%AC%ED%8B%B0&pagingIndex=1&pagingSize=40&productSet=total&query=%EB%B0%80%ED%81%AC%ED%8B%B0&sort=rel&viewType=list', {
  headers: {
    'authority': 'msearch.shopping.naver.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'logic': 'PART',
    'sbth': '75aeeb14fd003e8996458248335bfc8bf2710870061901cb68d1b4d14754714be573e37544b0b66141ff176a389bbbea',
    'sec-ch-ua': '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="114"',
    'sec-ch-ua-arch': '"arm"',
    'sec-ch-ua-bitness': '"64"',
    'sec-ch-ua-full-version-list': '"Whale";v="3.21.192.22", "Not-A.Brand";v="8.0.0.0", "Chromium";v="114.0.5735.138"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Android"',
    'sec-ch-ua-platform-version': '""',
    'sec-ch-ua-wow64': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965F Build/WHALE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Whale/3.21.192.22 Mobile Safari/537.36'
  }
}).then(console.log);



fetch('https://search.shopping.naver.com/api/search/all?eq=&frm=NVSHATC&iq=&origQuery=%EC%82%BC%EA%B2%B9%EC%82%B4&pagingIndex=1&pagingSize=40&productSet=total&query=%EC%82%BC%EA%B2%B9%EC%82%B4&sort=rel&viewType=list&window=&xq=', {
    headers: { 
        'authority': 'search.shopping.naver.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': 'NNB=XFAKOM3FWBEGG; ASID=3d63aeda00000183d9845de40000005f; autocomplete=use; AD_SHP_BID=18; _ga=GA1.2.1834935952.1667395532; SHP_BUCKET_ID=3; NSCS=1; nid_inf=-1414768515; NID_JKL=FicUSGqv2v1SQhZ86S5KYd02RYYknV1144+ObRT4k5s=; NID_AUT=tClj21DEE4vFWK+w9nNPBu3hDbKtmXdnCP2c/6SJT4dEOkjDxncwG3QryGaHXvNa; nx_ssl=2; page_uid=iebcHwprvmZssctEsSRssssstGZ-310899; NID_SES=AAABpsDZBZctWXsLwPURtZVwkc/r0dCeLdhaP/0VK7tLeaAN5qUrwvNE710Il5LLRt95e1WW3pBmsu2P+/F6ICKeLzn/Wudao2b2qSkeiCN88Qd9HbST0rJF+NRmoBKg3Xtwt+2tWA360pJbCqz2IayUBbY9smr0CovQVygG7GZIw5OtlwG6F+Xy6jwHjIPNrhWycaax+bxluS4iTsw6CVcKS8gPobf6wQHjLWQdUM+IPkGxwIqdBEKmHm2REPus5zxNk2EscT1ovuloX70d5oFmNaZe+ZwJEBh6imQtj79Taj0IW/+LN7U354TrAeV+a4qskukOsTzyShVcOLWiczp4t1Us6gLqoTuATkVhrCz/x8+0t7rBkPgbKU3AK2PZ0BHKerz0396v8LN0dzeEpSK1LWYOTbm0OMieAAB66WSUPkN4MW6wHZKtsDclRzfbuFiAobiGZMm2e39tUVuyygTy5Ri+xsAQx96Oga1EH3+wg6DzWNkoqbsLCNgZvZxNr4UCiOe1+gi5h/GlM9LsoY614zjffp0NW4w2s3GGfdUiPguaDkgaeXNBxL8RSmkLcxcDzQ==; spage_uid=iebcHwprvmZssctEsSRssssstGZ-310899',
        'dnt': '1',
        'logic': 'PART',
        'referer': 'https://search.shopping.naver.com/search/all?query=%EC%82%BC%EA%B2%B9%EC%82%B4&cat_id=&frm=NVSHATC',
        'sbth': '6bc7553b8fa3e04779448fd212e42bb42aead5286fdd970d56aeb7febdd7771e722135e7154a4df43c07ed6e235175b5',
        'sec-ch-ua': '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="114"',
        'sec-ch-ua-arch': '"arm"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version-list': '"Whale";v="3.21.192.22", "Not-A.Brand";v="8.0.0.0", "Chromium";v="114.0.5735.138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"macOS"',
        'sec-ch-ua-platform-version': '"13.6.0"',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Whale/3.21.192.22 Safari/537.36'
    }
});
fetch('https://search.shopping.naver.com/api/search/all?eq=&frm=NVSHATC&iq=&origQuery=%EC%82%BC%EA%B2%B9%EC%82%B4&pagingIndex=2&pagingSize=40&productSet=total&query=%EC%82%BC%EA%B2%B9%EC%82%B4&sort=rel&viewType=list&window=&xq=', {
  headers: {
    'authority': 'search.shopping.naver.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'logic': 'PART',
    'sbth': '6bc7553b8fa3e04779448fd212e42bb4b892ac565db6a918fdd93f1009c5a19f8b1be2616eb7866ab46a4c52ed4dc048',
    'sec-ch-ua': '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="114"',
    'sec-ch-ua-arch': '"arm"',
    'sec-ch-ua-bitness': '"64"',
    'sec-ch-ua-full-version-list': '"Whale";v="3.21.192.22", "Not-A.Brand";v="8.0.0.0", "Chromium";v="114.0.5735.138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"macOS"',
    'sec-ch-ua-platform-version': '"13.6.0"',
    'sec-ch-ua-wow64': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Whale/3.21.192.22 Safari/537.36'
  }
}).then(res => res.json()).then(data => console.log(data));
// Forbidden => cookie, dnt, referer

fetch('https://msearch.shopping.naver.com/api/search/all?origQuery=%EB%8B%AD%EB%B0%9C&pagingIndex=2&pagingSize=40&productSet=total&query=%EB%8B%AD%EB%B0%9C&sort=rel&viewType=list', {
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Mode': 'cors',
    'Accept-Language': 'ko-KR,ko;q=0.9',
    'Host': 'msearch.shopping.naver.com',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',
    'Referer': 'https://msearch.shopping.naver.com/search/all?query=%EB%8B%AD%EB%B0%9C',
    'Connection': 'keep-alive',
    'Cookie': 'NNB=SKQRMHARKCWWI; _naver_usersession_=Y5wCj1g7vQti5Kt4+KL0Kg==; page_uid=ie4nldprfACssUSF4wCssssssl4-232752; MM_PF=SEARCH; spage_uid=; ncpa=8779134|lmyv2io8|ae879b5b14aca9f868ae66b16564fad18e951813|s_1fc3a0eb8826a|aa99952b34f0922595488f6673ae837174de40ff:8127607|lmyvh0a0|b7df639ee85f86b6f76c83218d232d51c54f9195|s_198704a4de31|317862f5d26365e25fde70e71f0ec4f803ba63a6; nx_ssl=2; ASID=735ba6a50000018a1851dac40000005e; _ga=GA1.2.44251984.1680889918; SHP_BUCKET_ID=8; AD_SHP_BID=22',
    'Sec-Fetch-Dest': 'empty',
    'sbth': '6bc7553b8fa3e04779448fd212e42bb4aebb8e12f9921518484e099ef1b8527f06380410bf9f45558f4321f3e92af165',
    'logic': 'PART'
  }
});
fetch('https://msearch.shopping.naver.com/api/search/all?origQuery=%EB%8B%AD%EB%B0%9C&pagingIndex=2&pagingSize=40&productSet=total&query=%EB%8B%AD%EB%B0%9C&sort=rel&viewType=list', {
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Accept-Language': 'ko-KR,ko;q=0.9',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',
    'Sec-Fetch-Dest': 'empty',
    'sbth': '6bc7553b8fa3e04779448fd212e42bb4aebb8e12f9921518484e099ef1b8527f06380410bf9f45558f4321f3e92af165',
    'logic': 'PART'
  }
}).then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error));
// Forbidden => Accept-Encoding, Host, Referer, Connection, Cookie