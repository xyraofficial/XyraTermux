package com.xyra.termux;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.widget.FrameLayout;
import android.content.pm.PackageManager;
import android.view.ViewGroup;

public class MainActivity extends Activity {
    private WebView webView;
    private Handler cacheHandler = new Handler(Looper.getMainLooper());

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        FrameLayout mainContainer = new FrameLayout(this);
        mainContainer.setBackgroundColor(0xFF1a1a2e);
        mainContainer.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        
        webView = new WebView(this);
        webView.setBackgroundColor(0xFF1a1a2e);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        
        // Configure WebView settings for performance
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(false);
        
        // Caching configuration - improves performance significantly
        settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        
        // Viewport and zoom settings for smooth experience
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        
        // Performance optimizations
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setEnableSmoothTransition(true);
        settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        settings.setDefaultTextEncodingName("utf-8");
        settings.setUserAgentString(settings.getUserAgentString() + " XyraTermux/1.0");
        
        // Enable cookies for authentication
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.acceptThirdPartyCookies(webView);
        
        // Set WebView client
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
            }
            
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);
                System.err.println("WebView Error: " + errorCode + " - " + description);
            }
            
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // Load all HTTPS URLs
                if (url.startsWith("https://")) {
                    view.loadUrl(url);
                    return true;
                }
                return false;
            }
        });
        
        // Set WebChrome client for JS dialogs
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                System.out.println("WebView Console: " + message);
            }
        });
        
        mainContainer.addView(webView);
        
        // Load Termux Control app
        webView.loadUrl("https://termux-control.vercel.app/");
        setContentView(mainContainer);
        
        // Start auto cache clearing for optimal performance
        startAutoCacheClear();
    }
    
    /**
     * Automatically clears WebView cache every 5 minutes for optimal performance
     */
    private void startAutoCacheClear() {
        cacheHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                clearWebViewCache();
                // Schedule next cache clear in 5 minutes (300000 ms)
                cacheHandler.postDelayed(this, 5 * 60 * 1000);
            }
        }, 5 * 60 * 1000);
    }
    
    /**
     * Clears WebView cache and cookies for smooth performance
     */
    private void clearWebViewCache() {
        if (webView != null) {
            webView.clearCache(true);
            webView.clearHistory();
            CookieManager.getInstance().removeAllCookies(null);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Uri uri = intent.getData();
        if (uri != null) {
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
