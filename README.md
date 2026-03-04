# birthday-surprise-xiaoxiao

## Bunny Realtime Chat (Firebase)

This page now includes a romantic bunny assistant chat on the final scene:

- Bunny bubble text: `点我聊聊 / 我是天天的潜意识`
- Realtime 2-device chat using Firestore
- Firebase Anonymous Authentication
- URL room routing (same `room`, different `role`)

### URL examples

- Host: `https://your-site.github.io/birthday-surprise-xiaoxiao/?room=love520&role=host`
- Guest: `https://your-site.github.io/birthday-surprise-xiaoxiao/?room=love520&role=guest`

### Firebase Setup

1. Create a Firebase project.
2. Enable **Authentication → Anonymous**.
3. Create **Firestore Database** in production mode.
4. Open `index.html` and replace `firebaseConfig` in the module script at the bottom with your real project config.
5. Redeploy to GitHub Pages.

### Firestore Structure

```text
rooms
  {roomId}
    messages
      {messageId}
        text: string
        sender: "me" | "her"
        timestamp: server timestamp
```

### Firestore Security Rules

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId}/messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.keys().hasOnly(['text', 'sender', 'timestamp'])
                    && request.resource.data.text is string
                    && request.resource.data.text.size() > 0
                    && request.resource.data.text.size() <= 300
                    && request.resource.data.sender in ['me', 'her'];
      allow update, delete: if false;
    }
  }
}
```
