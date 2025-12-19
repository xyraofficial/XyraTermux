package com.xyra.termux;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.widget.FrameLayout;

public class MainActivity extends Activity {
    private WebView webView;
    private View loadingScreen;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        FrameLayout mainContainer = new FrameLayout(this);
        mainContainer.setBackgroundColor(0xFF1a1a2e);
        
        webView = new WebView(this);
        webView.setBackgroundColor(0xFF1a1a2e);
        
        // Configure WebView settings for better compatibility
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setBuiltInZoomControls(false);
        webView.getSettings().setDisplayZoomControls(false);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setLoadWithOverviewMode(true);
        webView.getSettings().setUserAgentString(webView.getSettings().getUserAgentString() + " XyraTermux/1.0");
        
        // Set WebView client for navigation
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (loadingScreen != null && loadingScreen.getVisibility() == View.VISIBLE) {
                    loadingScreen.setVisibility(View.GONE);
                }
            }
            
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("https://")) {
                    view.loadUrl(url);
                    return true;
                }
                return false;
            }
        });
        
        // Set WebChrome client for JS dialogs and console logs
        webView.setWebChromeClient(new WebChromeClient());
        
        loadingScreen = getLayoutInflater().inflate(R.layout.loading_screen, null);
        
        mainContainer.addView(webView);
        mainContainer.addView(loadingScreen);
        
        // Load Vercel app
        webView.loadUrl("https://xyra-termux.vercel.app/");
        setContentView(mainContainer);
    }

    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
