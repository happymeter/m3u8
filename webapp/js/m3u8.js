function play(url) {
    layer.open({
        type: 2,
        title: '在线播放',
        area: ['100%', '100%'],
        shade: 0.8,
        maxmin: false,
        closeBtn: 1,
        shadeClose: true,
        content: 'play.html?url=' + url
    });

}

function initCollapse(){
    var elemItem = $('.layui-colla-item')
    elemItem.each(function(){
        var othis = $(this)
            ,elemTitle = othis.find('.layui-colla-title')
            ,elemCont = othis.find('.layui-colla-content')
            ,isNone = elemCont.css('display') === 'none';

        //初始状态
        elemTitle.find('.layui-colla-icon').remove();
        elemTitle.append('<i class="layui-icon layui-colla-icon">'+ (isNone ? '&#xe602;' : '&#xe61a;') +'</i>');

        //点击标题
        elemTitle.off('click', onClickCollapse).on('click', onClickCollapse);
    });
}

function initData(){
    $.ajax({
        url: "data/m3u8.json", dataType: "json", success: function (data) {
            if (data.result) {
                console.log()
                $channels = $("#channels");
                for (var channel in data.data) {
                    $ul=$("<ul class=\"live-href\"></ul>")

                    $title=$("<h2 class=\"layui-colla-title\"></h2>");
                    $content=$("<div class=\"layui-colla-content\"></div>");

                    $item=$("<div class=\"layui-colla-item\"></div>");

                    urls=data.data[channel];

                    for(var name in urls){
                        $ul.append("<li url='" + urls[name] + "' title='"+name+"'>" + name + "</li>");
                    }
                    $title.append(channel);
                    $content.append($ul);

                    $item.append($title);
                    $item.append($content);

                    $channels.append($item);
                }
                bindPlayEvent();
                initCollapse();
            } else {
                layer.msg("无在线直播频道")
            }
        }
    })
}

function onClickCollapse(){
    var othis = $(this), icon = othis.find('.layui-colla-icon')
        ,elemCont = othis.siblings('.layui-colla-content')
        ,isNone = elemCont.css('display') === 'none';
    elemCont[isNone ? 'addClass' : 'removeClass']("layui-show");
    icon.html(isNone ? '&#xe61a;' : '&#xe602;');
}
function bindBtnEvent(){
    $('#play').on('click', function () {
        var url = $("#url").val();
        if (url == "") {
            layer.msg("请输入内容")
        } else {
            play(url)
        }
    });
}
function bindPlayEvent(){
    $('.live-href li').on('click', function () {
        url = $(this).attr("url");
        if (url != "") {
            play(url);
        } else {
            layer.msg("URL已失效")
        }
    });
}
$(function () {
    bindBtnEvent();
    initData();

})