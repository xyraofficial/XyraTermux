package com.xyra.termux;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.CookieManager;
import android.widget.FrameLayout;

public class MainActivity extends Activity {
    private WebView webView;
    private View loadingScreen;
    private static final String GOOGLE_AUTH_DOMAIN = "accounts.google.com";
    private static final String SUPABASE_AUTH_DOMAIN = "pikkpwouwavgrpanrdzc.supabase.co";

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        FrameLayout mainContainer = new FrameLayout(this);
        mainContainer.setBackgroundColor(0xFF1a1a2e);
        
        webView = new WebView(this);
        webView.setBackgroundColor(0xFF1a1a2e);
        
        // Configure WebView settings for Supabase OAuth compatibility
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setBuiltInZoomControls(false);
        webView.getSettings().setDisplayZoomControls(false);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setLoadWithOverviewMode(true);
        webView.getSettings().setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // Enable cookies for OAuth flow
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.acceptThirdPartyCookies(webView);
        
        // Set WebView client for navigation - INTERCEPT GOOGLE OAUTH
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (loadingScreen != null && loadingScreen.getVisibility() == View.VISIBLE) {
                    loadingScreen.setVisibility(View.GONE);
                }
            }
            
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);
                System.err.println("WebView Error: " + errorCode + " - " + description);
            }
            
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // TRICK: Detect Google OAuth and open in Chrome browser instead of WebView
                if (url.contains(GOOGLE_AUTH_DOMAIN) || url.contains("accounts.google.com")) {
                    // Open Google login in system Chrome browser (avoids 403 useragent error)
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setData(Uri.parse(url));
                    intent.setPackage("com.android.chrome"); // Force Chrome
                    startActivity(intent);
                    return true;
                }
                
                // Handle OAuth callback from Supabase
                if (url.contains(SUPABASE_AUTH_DOMAIN) && url.contains("auth/v1/callback")) {
                    view.loadUrl(url);
                    return true;
                }
                
                // Load other URLs normally
                if (url.startsWith("https://")) {
                    view.loadUrl(url);
                    return true;
                }
                
                return false;
            }
        });
        
        // Set WebChrome client for JS dialogs and console logs
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                System.out.println("WebView Console: " + message);
            }
        });
        
        loadingScreen = getLayoutInflater().inflate(R.layout.loading_screen, null);
        
        mainContainer.addView(webView);
        mainContainer.addView(loadingScreen);
        
        // Load Vercel app
        webView.loadUrl("https://xyra-termux.vercel.app/");
        setContentView(mainContainer);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        
        // Handle deep link from OAuth callback
        Uri uri = intent.getData();
        if (uri != null && uri.toString().contains("auth/v1/callback")) {
            // Load the callback URL in WebView
            webView.loadUrl(uri.toString());
        }
    }

    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
