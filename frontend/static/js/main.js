// Initialize navbar with login view
var navView = new NavView();
var loginView = new LoginView();
var footerView = new FooterView();

// Initialize facebook app
FB.init({appId: '1705522486327956'});
var user = new FacebookUser();
