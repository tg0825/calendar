(function () {
    this.calendar = function (y, m) {
        var new_year = y || new Date().getFullYear();
        var new_month = (typeof m === 'number') ? m : new Date().getMonth() + 1;
        var d = new Date(new_year, new_month-1, 1);
        var year = d.getFullYear();
        var month = d.getMonth();
        var date = d.getDate();
        var day = d.getDay();
        // 월별 일수 구하기
        var d_length = 32 - new Date(new_year, new_month-1, 32).getDate();

        var caption_year = document.querySelector('.year');
        var caption_month = document.querySelector('.month');
        var table = document.querySelector('#calendar');
        var tbody = table.querySelector('tbody');

        var idx = 0;
        var str = '';
        for (var j = 0; j < 6; j++) {
            str += '<tr>';
            for (var k = 0; k < 7; k++) {
                str += '<td data-td-index=' + idx +'>' +

                '</td>';
                idx += 1;
            }
            str += '</tr>';
        }
        tbody.innerHTML = str;

        var start_day = tbody.querySelectorAll('tr td');
        for (var i = day; i < day + d_length; i++) {
            start_day[i].innerHTML = date;
            date++;
        }
        caption_year.innerHTML = year;
        caption_month.innerHTML = month + 1;
    }
}());

(function () {
    var caption_year = document.querySelector('.year');
    var caption_month = document.querySelector('.month');
    var result = document.querySelector('[name=result]');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var activeIdx = null;

    prev.onclick = function () {
        calendar(year, --month);
    };

    next.onclick = function () {
        calendar(year, ++month)
    }
    document.querySelector('tbody').onclick = function (e) {
        var target = e.target;
        var y = caption_year.textContent;
        var m = caption_month.textContent;
        if (activeIdx >= 0 && activeIdx !== null) {
            document.querySelector('td[data-td-index="' + activeIdx +'"]').classList.remove('active');
        }
        if (target.tagName === 'TD' && target.innerHTML !== '') {
            target.classList.add('active');
            activeIdx = target.dataset.tdIndex;
            result.value = y + '-' + m + '-' + target.innerHTML;
        }
    }
}());
