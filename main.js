// (추가예정) last login datetime

let username = '';
let userteam = '';

const sheetId = '1D3xNE6orWM4gPSXunAYaf1ohteqJMSEcTkzP5wejfoM';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;

const links = document.querySelector('.links');
const ifrm = document.querySelector('#nv_window');
const progresstime = document.querySelector('.loading');
const progressbar = document.querySelector('#loadingbar');
const timemax = 20;

let timeleft = 1;
let timer;
let today_point = 0;

// 1. 회원가입, 로그인 (sheetname 'member')
//  1) 로그인 창 - 아이디 없으면 회원가입 
//  2) 회원가입 창 - (id, pw=id, name, team)
if( getCookie('dnd_user') == '' || getCookie('dnd_team') == '' || getCookie('dnd_user') == null || getCookie('dnd_team') == null ) {
    document.querySelector('#login-holder').classList.remove('hidden');
    document.querySelector('nav').classList.add('hidden');
    document.querySelector('section').classList.add('hidden');

    const loginForm = document.querySelector('#login-form');
    // enter key 이벤트 삭제
    loginForm.addEventListener('keypress', e => {
        if (e.keyCode === 13) e.preventDefault();
    });
    // 로그인 시도 루틴
    document.querySelector('#login-form-submit').addEventListener('click', e => {
        if( loginForm.userid.value.trim() == '' || loginForm.password.value.trim() == '' ) {
            errorMsg('p', 'login-error-msg', 'Please fill id and password');
        } else {
            e.preventDefault();
            const members = getSheetMember().then( (values) => {
                let isMember = false;
                for (let i=0; i<values.length; i++) {
                    // console.log(values[i]);
                    if( loginForm.userid.value.trim() == values[i].id && loginForm.password.value.trim() == values[i].password ) {
                        isMember = true;
                        alert(`환영합니다. ${values[i].name}님`);
                        setCookieToday('dnd_user',values[i].name);
                        setCookieToday('dnd_team',values[i].team);
                        // last login datetime 기록 (추가예정)
                        location.reload();
                    }
                }
                if (isMember == false) errorMsg('p', 'login-error-msg', 'Invalid user id and password');
            });
        }
    });
    loginForm.userid.addEventListener('focus', () => {        // document.querySelector('p.login-error-msg').style.opacity=0;
        const rm = document.querySelector('p.login-error-msg');
        if (rm != null) rm.remove();
    });
    loginForm.password.addEventListener('focus', () => {        // document.querySelector('p.login-error-msg').style.opacity=0;
        const rm = document.querySelector('p.login-error-msg');
        if (rm != null) rm.remove();
    });
    loginForm.username.addEventListener('focus', () => {        // document.querySelector('p.login-error-msg').style.opacity=0;
        const rm = document.querySelector('p.login-error-msg');
        if (rm != null) rm.remove();
    });
    document.querySelector('#back-button').addEventListener('click', e => {
        e.preventDefault();
        location.reload();
    });
    // 회원가입 박스 로딩 루틴
    document.querySelector('#join-button').addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#login-holder h2').innerHTML = 'Registration';
        loginForm.username.classList.remove('hidden');
        loginForm.userteam.classList.remove('hidden');
        document.querySelector('#forgot-id').classList.add('hidden');
        document.querySelector('#login-form-submit').classList.add('hidden');
        document.querySelector('#join-holder').classList.add('hidden');
        document.querySelector('#join-ok-button').classList.remove('hidden');
        document.querySelector('#back-button').classList.remove('hidden');
    });
    // 회원가입 처리 루틴
    document.querySelector('#join-ok-button').addEventListener('click', e => {
        e.preventDefault();
        //document.querySelector('#login-error-msg').style.opacity=0;
        if( loginForm.userid.value.trim() == '' || loginForm.password.value.trim() == '' || loginForm.username.value.trim() == '' || loginForm.userteam.value.trim() == '' ) {
            errorMsg('p', 'login-error-msg', 'Please fill all inputs');
        } else if ( loginForm.userid.value.trim() != loginForm.password.value.trim() ) {
            errorMsg('p', 'login-error-msg', 'Password must same with id');
        } else {
            // gogle sheet - member 읽어와서 대조
            const members = getSheetMember().then( (values) => {
                for (let i=0; i<values.length; i++) {
                    if( loginForm.userid.value.trim() == values[i].id && (loginForm.username.value.trim() == values[i].name && loginForm.userteam.value.trim() == values[i].team)) {
                        errorMsg('p', 'login-error-msg', 'duplicated id, username and team');
                        loginForm.userid.value = '';
                        loginForm.password.value = '';
                        loginForm.username.value = '';
                        loginForm.userteam.value = '';
                        return false;
                    } else if( loginForm.userid.value.trim() == values[i].id) {
                        errorMsg('p', 'login-error-msg', 'duplicated id');
                        loginForm.userid.value = '';
                        loginForm.password.value = '';
                        // loginForm.username.value = '';
                        // loginForm.userteam.value = '';
                        return false;
                    } else if( loginForm.username.value.trim() == values[i].name && loginForm.userteam.value.trim() == values[i].team ) {
                        errorMsg('p', 'login-error-msg', 'duplicated username and team');
                        loginForm.username.value = '';
                        loginForm.userteam.value = '';
                        return false;
                    }
                }
                return true;
            }).then(result => {
                // 똑같은 값이 없으면 google sheet - member에 정보 입력 (id, password, name, team, join, last)
                if (result == true) {
                    // console.log({userid:loginForm.userid.value.trim(), username:loginForm.username.value.trim(), userteam:loginForm.userteam.value.trim()});
                    const res = gsSheetWrite('member', {userid:loginForm.userid.value.trim(), username:loginForm.username.value.trim(), userteam:loginForm.userteam.value.trim()});
                    if (res == true) {
                        // console.log(`환영합니다. ${loginForm.username.value.trim()}님\n\n ID로 로그인 해주세요`);
                        alert(`환영합니다. ${loginForm.username.value.trim()}님\n\nID로 로그인 해주세요`);
                        location.reload();
                    }
                }
            });
        }
    });
    // ID 찾기 박스 로딩 루틴
    document.querySelector('#forgot-id-button').addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#login-holder h2').innerHTML = 'Forgot ID';
        loginForm.userid.classList.add('hidden');
        loginForm.password.classList.add('hidden');
        loginForm.username.classList.remove('hidden');
        loginForm.userteam.classList.remove('hidden');
        document.querySelector('#forgot-id').classList.add('hidden');
        document.querySelector('#login-form-submit').classList.add('hidden');
        document.querySelector('#join-holder').classList.add('hidden');
        document.querySelector('#back-button').classList.remove('hidden');
        document.querySelector('#forgot-id-ok-button').classList.remove('hidden');
    });
    // ID 찾기 처리 루틴
    document.querySelector('#forgot-id-ok-button').addEventListener('click', e => {
        e.preventDefault();
        //document.querySelector('#login-error-msg').style.opacity=0;
        if( loginForm.username.value.trim() == '' || loginForm.userteam.value.trim() == '' ) {
            errorMsg('p', 'login-error-msg', 'Please fill all inputs');
        } else {
            const members = getSheetMember().then( (values) => {
                for (let i=0; i<values.length; i++) {
                    if( loginForm.username.value.trim() == values[i].name && loginForm.userteam.value.trim() == values[i].team ) {
                        alert(values[i].name+ '님의 ID는 \''+values[i].id+'\'입니다\n\nID로 로그인 해주세요');
                        location.reload();
                    } else {
                        errorMsg('p', 'login-error-msg', 'can\'t find username and userteam');
                        loginForm.username.value = '';
                        loginForm.userteam.value = '';
                    }
                }
            });
        }
    });
// 로그인 된 루틴
} else if ( getCookie('dnd_user') != '' && getCookie('dnd_team') != '' && getCookie('dnd_user') != null && getCookie('dnd_team') != null ) {
    document.querySelector('#login-holder').classList.add('hidden');
    document.querySelector('body').classList.remove('background');
    document.querySelector('nav').classList.remove('hidden');
    document.querySelector('section').classList.remove('hidden');

    username = getCookie('dnd_user');
    userteam = getCookie('dnd_team');
}
// 로그인을 위해 사용자 정보 읽기
async function getSheetMember() {
    const sheetName = 'member';
    const query = encodeURIComponent('Select *').replace(/%20/g,'+');
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    const response = await fetch(url);
    const data = await response.text();
    const parsed = JSON.parse(data.substring(47).slice(0, -2));

    const members = parsed.table.rows
        .map(({ c }) => cleanRow(c))
        .map(([id, password, name, team, join, last]) => ({id, password, name, team, join, last}));

    return members;
}

// 2. 트래픽 상품 읽기
// 2-1. 구글 시트 읽기 - 유저 투데이 포인트
// const getSheetData = async () => {
async function getSheetDataUser() {
    const sheetName = 'team';
    const query = encodeURIComponent(`SELECT * WHERE C = "${username}" AND D = "${userteam}" AND A = DATE "${formatDate(new Date(), 'YYYY-MM-dd')}"`).replace(/%20/gi,'+');
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    const response = await fetch(url);
    // const data = await response.text().substring(47).slice(0, -2).json();
    const data = await response.text();
    const parsed = JSON.parse(data.substring(47).slice(0, -2));

    // console.log(parsed);
    const userinfo = parsed.table.rows
        .map(({ c }) => cleanRow(c))
        .map(([date, time, name, team, point, store, keyword, category]) => ({date, time, name, team, point, store, keyword, category}));
    // console.log(items);

    return userinfo;
}
// 2-2. 구글 시트 읽기 - 트래픽 상품
async function getSheetDataItem() {
    const sheetName = 'keywords';
    const query = encodeURIComponent('Select *').replace(/%20/g,'+');
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    const response = await fetch(url);
    const data = await response.text();
    const parsed = JSON.parse(data.substring(47).slice(0, -2));

    // console.log(parsed);
    const items = parsed.table.rows
        .map(({ c }) => cleanRow(c))
        .map(([name, category, keyword, typeTraffic, trafficStart, trafficFinish, point, nvMid, ctMid, page, catalog, storeId, url]) => ({ name, category, keyword, typeTraffic, trafficStart, trafficFinish, point, nvMid, ctMid, page, catalog, storeId, url }));
    // console.log(clicks);

    return items;
}
// 2-3. 유저 포인트 업데이트, 트래픽 상품 업데이트
async function UpdateInfo() {
    await Promise.all([user, list]).then( result => {
        const user = result[0];
        const items = result[1];

        // currnet datetime
        const today = new Date();
        document.querySelector('.curDT').innerHTML = formatDate(today,'MM/dd(a)hh:mm');

        // 사용자 point 읽어서 업데이트
        for(let i=0; i<user.length; i++) {
            today_point += Number(user[i].point);
        }
        document.querySelector('.user .point').innerHTML = today_point + 'p';

        let prod_count = 0;
        // 상품별로 클릭 링크 만들기
        for(let i = 1; i < items.length; i++) {
            const cc = user.findIndex(c => c.store == items[i].name && c.keyword == items[i].keyword && c.category == items[i].category);
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
    }).then(() => {
        // 상품 클릭 링크 1)없을 때 2)모두 클릭했을 때
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
            // logout button
            document.querySelector('.user .name').innerHTML = '<a href="javascript:delCookie(\'dnd_user\');delCookie(\'dnd_team\');window.location.reload();" title="로그인">' + username + '님(' + userteam + '팀)</a>';

            // iframe init source
            ifrm.src = 'ifrm_src.html';
        }
    });
    
}
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

const user = getSheetDataUser();
const list = getSheetDataItem();
// 3. 정보들 화면에 뿌려주기
const userlist = UpdateInfo();

// 4. 리워드 프로그램 루틴
ifrm.addEventListener('load', e => {
    if (ifrm.contentWindow.length == 0) {
        const node_li = window.parent.document.querySelector('.active');
        if (node_li != null) {
            timeleft = 1;
            timer = setInterval( () => {
                if (timeleft >= timemax) {
                    progresstime.innerHTML = "";
                    progressbar.value = 0;
                    // node_li.firstChild.removeEventListener('click', clickEvent);
                    node_li.firstChild.removeEventListener('click', clickEvent);
                    today_point += Number(node_li.firstChild.getAttribute('data-p')); // 업체마다의 point를 읽어와야 함 // 개인별 추가 point 계산해야함
                    gsSheetWrite('team', node_li.firstChild);
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
// catalog
//  pc (O) https://search.shopping.naver.com/gate.nhn?id=41836294251
//  mb (O) https://msearch.shopping.naver.com/detail/detail.nhn?nv_mid=41836294251
//  mb (O) https://msearch.shopping.naver.com/detail/detail.nhn?nvMid=41836294251
//  mb (O) https://msearch.shopping.naver.com/detail/lite.nhn?nv_mid=41836294251
// product
//  pc (O) https://search.shopping.naver.com/gate.nhn?id=86762650836
//  mb (X) https://msearch.shopping.naver.com/detail/detail.nhn?nv_mid=86762650836
//  mb (X) https://msearch.shopping.naver.com/detail/lite.nhn?nv_mid=13072849452

function clickEvent(event) {
    const nvmid = event.currentTarget.getAttribute('data-i');
    const catalog = event.currentTarget.getAttribute('data-t');
    console.log (catalog);
    if (catalog != "" && catalog != null) { //if (catalog == "PROD") {
        // url_src = 'https://msearch.shopping.naver.com/catalog/'+catalog;
        // url_src = 'https://search.shopping.naver.com/gate.nhn?id='+catalog; // 카탈로그로 넘어가는 링크 (PC)
        // url_src = 'https://search.shopping.naver.com/gate.nhn?id='+nvmid; // 상품으로 넘어가는 링크 (PC)
        url_src = 'https://msearch.shopping.naver.com/product/'+nvmid;
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

// 6. 구글에 리워드 기록
function gsSheetWrite(sheet, node_a) {
    const url_gs = "https://script.google.com/macros/s/AKfycbyxB5cxi5Zf4VGR3eW6ujGKzY7_mu-9H-JR7auakBL_WBYAMEPmckG1GM9Q_qrlLBEy/exec" + "?sheet=" + sheet;
    let request = new XMLHttpRequest();
    let data;
    if (sheet == 'team') {
        data = {
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
    } else if (sheet == 'member') {
        data = {
            'id': node_a.userid,
            'password': node_a.userid,
            'name': node_a.username,
            'team': node_a.userteam,
            'join': formatDate(today,'MM-dd hh:mm:ss'),
            'last': formatDate(today,'MM-dd hh:mm:ss')
        };
    } else {
        return false;
    }
    request.open('GET',url_gs+'&'+encodeFormData(data), true);
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
    // console.log(today, url_gs+'?'+encodeFormData(data));
    // console.log(request);
    if (sheet == 'team') {
        document.querySelector('.user .point').innerHTML = today_point + 'p';
    }

    return true;
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

function errorMsg(el, nodename, msg) {
    let err_msg_el = document.querySelector(el+'.'+nodename);
    if (err_msg_el == null) {
        err_msg_el = document.createElement('p');
        err_msg_el.classList.add('login-error-msg');
        document.querySelector('#forgot-id').parentNode.insertBefore(err_msg_el, document.querySelector('#forgot-id').nextSibling);
    }
    err_msg_el.innerHTML = msg;
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
//쿠키 저장하는 함수 - 오늘 하루
// const setCookieToday = function (key, value) {
function setCookieToday(key, value) {
    let todayDate = new Date();
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
    const expires = ( todayDate > new Date() ) ? 0 : 1;
    todayDate.setDate( todayDate.getDate() + expires);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    // Cookies.set(key, value, {expires: todayDate.toGMTString()});
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
