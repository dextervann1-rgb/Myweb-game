package com.abbadivinevision.omega;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "OmegaMainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        String action = intent.getAction();
        Uri data = intent.getData();

        if (Intent.ACTION_VIEW.equals(action) && data != null) {
            String scheme = data.getScheme();
            String host = data.getHost();
            Log.d(TAG, "Deep Link Captured: scheme=" + scheme + ", host=" + host);

            if ("omega".equalsIgnoreCase(scheme) && "wallet-return".equalsIgnoreCase(host)) {
                Log.i(TAG, "Web3 Wallet Return Received successfully: " + data.toString());
                // Deep link return handler
            }
        }
    }
}
