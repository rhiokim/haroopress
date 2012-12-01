var fs = require('fs'),
    colors = require('colors');

var header = '# locally vhost';

function existHost(lines, vhost) {
    var res = lines.every(function(line) {
        return line.match(vhost) != null;
    });
}

function loadFile(file) {
    var res, lines, data
   
    try {
        data = fs.readFileSync(file, 'utf8');
    } catch(e) {
        return;
    }

    lines = data.split('\n');

    return lines;
}

function saveFile(file, lines) {
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
}

function applyVirtualHost(file, vhost) {
    var match, headline;

    console.log('- locally notice! -----------------------------------------------------------------');
    console.log('- 로컬리(locally)는 호스트 파일에 지정한 도메인 정보를 직접 작성하기 때문에 관리자 권한으로 실행되야 합니다.'.red);
    console.log('- 또한 사용자가 지정하지 않는 어떠한 정보도 추가, 변경, 삭제하지 않습니다.'.red);
    console.log('- 소스확인 : https://github.com/rhiokim/locally/blob/master/lib/vhosts.js'.yellow);
    console.log('-----------------------------------------------------------------------------------');

    var lines = loadFile(file);
    var res = lines.every(function(line, idx) {
        match = line.match(header);

        if(match != null) {
           headline = idx; 
        }

        return line.match(vhost) == null;
    });

    if(!headline) {
        lines.push(header);
        headline = lines.length - 1;
    }

    if(res) {
        lines.splice(headline+1, 0, "127.0.0.1\t"+ vhost);
    }

    saveFile(file, lines);
}

module.exports = {
    darwin: function(vhost) {
        applyVirtualHost('/etc/hosts', vhost);
    },

    freebsd: function(vhost) {
    },
    linux: function(vhost) {},
    win32: function(vhost) {
        applyVirtualHost('c:\\windows\\system32\\dirvers\\etc\\hosts', vhost);
    },
    sunos: function(vhost) {}
}
