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
import android.webkit.WebSettings;
import android.widget.FrameLayout;
import android.content.pm.PackageManager;

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
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // Fix Google OAuth user agent issue
        String userAgent = webView.getSettings().getUserAgentString();
        settings.setUserAgentString(userAgent);
        
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
                // Keep Google OAuth inside the app using WebView
                // The WebView handles OAuth flow internally
                if (url.contains(GOOGLE_AUTH_DOMAIN) || url.contains("accounts.google.com")) {
                    // Load Google login directly in WebView
                    view.loadUrl(url);
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
