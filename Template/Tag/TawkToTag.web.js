(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var tawkToId = parameters.get("tawkToId");
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/' + tawkToId + '/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        };
    };
})();
