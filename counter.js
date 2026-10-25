// عداد جاهز من غير أي إعداد أو تسجيل دخول
var COUNTER_BASE = "https://abacus.jasoncameron.dev";
var COUNTER_NS = "hafiz-alwird-diaa";

window.hit = function (key) {
  return fetch(COUNTER_BASE + "/hit/" + COUNTER_NS + "/" + key).catch(function () {});
};

function getCount(key) {
  return fetch(COUNTER_BASE + "/get/" + COUNTER_NS + "/" + key)
    .then(function (r) { return r.ok ? r.json() : { value: 0 }; })
    .then(function (d) { return d.value || 0; });
}

window.watchStats = function (callback) {
  function load() {
    Promise.all([getCount("views"), getCount("downloads")])
      .then(function (v) { callback({ views: v[0], downloads: v[1] }); })
      .catch(function (e) { callback(null, e); });
  }
  load();
  setInterval(load, 10000);
};
