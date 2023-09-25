// 1. 쿠키 설정 - 이름 저장
// 2. ip, mobile device, browser
// 
let username = '';
let userteam = '';

if( getCookie('dnd_user') == '' || getCookie('dnd_team') == '' || getCookie('dnd_user') == null || getCookie('dnd_team') == null ) {
    [username, userteam] = prompt('<Duck and Drake>\n\n활동명,팀장명을 입력하세요(,로 구분)').replace(/[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/ ]/gim,'').split(',');
    if (username == null || userteam == null || username == '' || userteam == '') {
        alert('다시 접속하세요');
        throw new Error('retry please');
    }
    setCookie('dnd_user',username,10);
    setCookie('dnd_team',userteam,10);
} else {
    username = getCookie('dnd_user');
    userteam = getCookie('dnd_team');
}

const links = document.querySelector('.links');
const ifrm = document.querySelector('#nv_window');
const progresstime = document.querySelector('.loading');
const progressbar = document.querySelector('#loadingbar');
const timemax = 20;
let timeleft = 1;
let timer;
let today_point = 0;

const getSheetData = async () => {
    const sheetId = '1D3xNE6orWM4gPSXunAYaf1ohteqJMSEcTkzP5wejfoM';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    let sheetName = 'keywords';
    let query = encodeURIComponent('Select *').replace(/%20/g,'+');
    let url = `${base}&sheet=${sheetName}&tq=${query}`;

    let response = await fetch(url);
    // const data = await response.text().substring(47).slice(0, -2).json();
    let data = await response.text();
    let parsed = JSON.parse(data.substring(47).slice(0, -2));

    // console.log(parsed);
    let items = parsed.table.rows
        .map(({ c }) => cleanRow(c))
        .map(([name, category, keyword, typeTraffic, trafficStart, trafficFinish, point, nvMid, ctMid, page, catalog, storeId, url]) => ({ name, category, keyword, typeTraffic, trafficStart, trafficFinish, point, nvMid, ctMid, page, catalog, storeId, url }));
    // console.log(items);

    sheetName = 'team';
    query = encodeURIComponent(`SELECT * WHERE C = "${username}" AND A = DATE "${formatDate(new Date(), 'YYYY-MM-dd')}"`).replace(/%20/gi,'+');
    url = `${base}&sheet=${sheetName}&tq=${query}`;

    response = await fetch(url);
    data = await response.text();
    parsed = JSON.parse(data.substring(47).slice(0, -2));

    // console.log(parsed);
    const clicks = parsed.table.rows
        .map(({ c }) => cleanRow(c))
        .map(([date, time, name, team, point, store, keyword, category]) => ({date, time, name, team, point, store, keyword, category}));
    // console.log(clicks);
    for(let i=0; i<clicks.length; i++) {
        today_point += Number(clicks[i].point);
    }
    document.querySelector('.user .point').innerHTML = today_point + 'p';
    
    let prod_count = 0;

    for(let i = 1; i < items.length; i++) {
        const cc = clicks.findIndex(c => c.store == items[i].name && c.keyword == items[i].keyword && c.category == items[i].category);
        // if( cc > -1 ) {
        //     console.log('found!', username, userteam, items[i].category, items[i].point, items[i].name, items[i].keyword);
        // }
        if( items[i].typeTraffic == '1' ) {
            prod_count++;
            if( cc == -1 ) {
                const li = document.createElement('li');
                const li_a = document.createElement('a');
                li_a.setAttribute('href','javascript:void(0);');
                li_a.setAttribute('data-i',items[i].nvMid);
                li_a.setAttribute('data-p',items[i].point);
                li_a.setAttribute('data-c',items[i].category);
                li_a.setAttribute('data-k',items[i].keyword);
                li_a.setAttribute('data-s',items[i].name);
                if(items[i].ctMid!='_') li_a.setAttribute('data-t',items[i].ctMid);
                li_a.textContent = prod_count + '번상품'; //items[i].name;
                const li_a_span = document.createElement('span');
                li_a_span.textContent = '(' + items[i].point + ')';
                li_a.appendChild(li_a_span);
                li.appendChild(li_a);
                links.append(li);
            }
        }
    }
    
    if( links.children.length < 1 ) {
        const li = document.createElement('li');
        li.setAttribute('class','done');
        li.textContent = '완료';
        links.append(li);

        ifrm.src = 'ifrm_done.html';
    } else {
        for (let i = 0; i < links.childNodes.length; i++) {
            links.childNodes[i].firstChild.addEventListener('click', clickEvent);
        }
    }

    return items;
};
function cleanRow(row) {
    // row = [null,{v:'123'},null,{v:'hello'}]
    function replaceNull(item) {
        if (item == null) {
            return { v: '' }
        }
        return item
    }
    const data = row
        .map((item) => replaceNull(item))
        .map((item) => item.v)
    return data
}
const list = getSheetData();

// name, point, currnet datetime
document.querySelector('.user .name').innerHTML = '<a href="javascript:delCookie(\'dnd_user\');delCookie(\'dnd_team\');window.location.reload();" title="이름 수정">' + username + '님(' + userteam + ')</a>';
ifrm.src = 'ifrm_src.html';

const today = new Date();
document.querySelector('.curDT').innerHTML = formatDate(today,'MM/dd(a)hh:mm');

ifrm.addEventListener('load', e => {
    if (ifrm.contentWindow.length == 0) {
        const node_li = window.parent.document.querySelector('.active');
        if (node_li != null) {
            timeleft = 1;
            timer = setInterval( () => {
                if (timeleft >= timemax) {
                    progresstime.innerHTML = "";
                    progressbar.value = 0;
                    node_li.firstChild.removeEventListener('click', clickEvent);
                    today_point += Number(node_li.firstChild.getAttribute('data-p')); // 업체마다의 point를 읽어와야 함 // 개인별 추가 point 계산해야함
                    gsSheetWrite(node_li.firstChild);
                    node_li.remove();
                    ifrm.classList.remove('prevent-click');
                    if( links.children.length < 1 ) {
                        const li = document.createElement('li');
                        li.setAttribute('class','done');
                        li.textContent = '완료';
                        links.append(li);

                        ifrm.src = 'ifrm_done.html';
                    }
                    clearInterval(timer);
                    return;
                }
                ifrm.classList.add('prevent-click');
                progresstime.innerHTML = timeleft + 's';
                progressbar.value = timeleft;
                timeleft++;
            }, 1000);    
        }
    }
});
function clickEvent(event) {
    const nvmid = event.currentTarget.getAttribute('data-i');
    const catalog = event.currentTarget.getAttribute('data-t');
    if (catalog == "PROD") {
        url_src = 'https://msearch.shopping.naver.com/catalog/'+nvmid;
    } else {
        url_src = 'https://msearch.shopping.naver.com/product/'+nvmid;
    }
    ifrm.src = url_src;
    toggleActive(event.currentTarget.parentNode, 'active');
    progresstime.innerHTML = "";
    progressbar.value = 0;
    progressbar.max = timemax;
    clearInterval(timer);
}
function gsSheetWrite(node_a) {
    const url_gs = "https://script.google.com/macros/s/AKfycbzofJpqNaYzPyNGzHM_r0clua6LBsJJ8fIVILUxOcbqb4-UGTFB_1NgtWbaqNPT0FGi/exec";
    let request = new XMLHttpRequest();
    let data = {
        'date': formatDate(today,'MM-dd'),
        'time': formatDate(today,'hh:mm:ss'),
        'name': username,
        'team': userteam,
        'point': Number(node_a.getAttribute('data-p')),
        'store': node_a.getAttribute('data-s'), //node_a.innerHTML.replace(/<span>((?!<\/span>).)*<\/span>/gi, ''),
        'keyword': node_a.getAttribute('data-k'),
        'category': node_a.getAttribute('data-c'),
        'agent': user_agent,
        'ip': document.querySelector('.user .ip_addr').innerHTML
    };
    // console.log(today, url_gs+'?'+encodeFormData(data));
    request.open('GET',url_gs+'?'+encodeFormData(data), true);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            // console.log('current point=',Number(node_a.getAttribute('data-p')));
        } else {
            console.log('onload:',e);
        }
    }
    request.onerror = () => {
        console.log('onerror:',e);
    }
    request.send();
    document.querySelector('.user .point').innerHTML = today_point + 'p';
}

function encodeFormData(data){
    if(!data) return '';

    let pairs = [];
    for(let name in data) {
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name]=== 'function') continue;

        let value = data[name].toString();
        // name  = encodeURIComponent( name.replace(' ','+'));
        // value = encodeURIComponent(value.replace(' ','+'));
        name  = encodeURIComponent( name.replace(/\s/gi,'+'));
        value = encodeURIComponent(value.replace(/\s/gi,' '));
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}

function toggleActive(item, classname) {
    // const siblings = item.parentElement.chiildren;
    const siblings = item.parentNode.children;
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove(classname);
    }
    item.classList.add(classname);
}

function formatDate(date, format) {
    const weekd = ['일','월','화','수','목','금','토'];
    const map = {
        MM: date.getMonth() + 1,
        dd: String(date.getDate()).padStart(2, '0'),
        YYYY: date.getFullYear(),
        YY: date.getFullYear().toString().slice(-2),
        a: weekd[date.getDay()],
        hh: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0')
    }
    return format.replace(/MM|dd|YYYY|YY|a|hh|mm|ss/g, matched => map[matched]);
}

function getAgent() {
    if( navigator.userAgent.match(/iPhone/i) ) {
        agent = 'iPhone';
    } else if ( navigator.userAgent.match(/Android/i) ) {
        agent = 'Android';
    } else if ( navigator.userAgent.match(/iPad/i) ) {
        agent = 'iPad';
    } else if ( navigator.userAgent.match(/Tablet/i) ) {
        agent = 'Tablet';
    } else {
        agent = 'PC';
    }

    return agent;
}
const user_agent = getAgent();

function getIP(json) {
    console.log('ip=',json.ip)
    //return json.ip;
    user_ip = json.ip;
}
async function getClientIP() {
    // console.log('what is my ip?');
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        // console.log('response.data.ip',response.data.ip);
        document.querySelector('.user .ip_addr').innerHTML = response.data.ip;
        return response.data.ip;
    } catch (error) {
        console.error(error);
    }
}
user_ip = getClientIP();

//쿠키 저장하는 함수
function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    //todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}
//쿠키 값 가져오는 함수
function getCookie(key){
	key = new RegExp(key + '=([^;]*)'); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
	return key.test(document.cookie) ? unescape(RegExp.$1) : ''; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
}
//쿠키 삭제하는 함수
function delCookie(key){
    let todayDate = new Date();
    document.cookie = key + "=; path=/; expires=" + todayDate.toGMTString() + ";" // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
}