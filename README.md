
# Notify.js

A lightweight JavaScript class for creating and managing notifications on a webpage. This class allows you to create various types of notifications with customizable behavior such as automatic closing, delay time, and position.

## Features

- Create notifications with different types: `info`, `success`, `warning`, and `error`.
- Customizable auto-close behavior with adjustable delay time.
- Supports different notification positions (`center`, `left`, `right`).
- Custom close animation timing.

## Installation

Simply include the `notify.js` file in your project:

```html
<script src="path/to/notify.js"></script>
```

## Usage

Create an instance of the `Notify` class:

```javascript
const notifier = new Notify({
    close: { 
        auto: true, // Auto close the notification
        time: 500, // Duration of closing
        delay: 5000 // Delay befor closing (time of showing notification)
    },
    position: 'right', // Position of the notifications: 'left', 'center', or 'right'
});
```

### Creating a New Notification

To create a new notification, use the `new` method of the `Notify` instance:

```javascript
notifier.new({
    type: 'success', // Type of notification: 'info', 'success', 'warning', 'error'
    title: 'Success',
    text: 'Your action was successful!',
});
```

You can also create a simple text notification:

```javascript
notifier.new('This is a simple notification!');
```

### Parameters

When creating an instance of the `Notify` class, you can pass an options object:

- `close`: Can be a boolean, string, number, or object to control auto-close behavior:
  - Boolean: `true` enables auto-close with a default delay of 5000 ms.
  - String/Number: Sets the close time in milliseconds.
  - Object: Define `{ auto: true/false, time: <milliseconds>, delay: <milliseconds> }`.

- `position`: Specifies the position of the notifications. Accepts `'left'`, `'right'`, or `'center'`.

### Methods

#### `new(params)`

Creates a new notification. `params` can be:
- A string (for a simple text notification).
- An object with the following properties:
  - `type` (string): Notification type (`'info'`, `'success'`, `'warning'`, `'error'`).
  - `title` (string, optional): Title of the notification.
  - `text` (string, optional): Text content of the notification.

#### `close(notify)`

Closes a specific notification element.

## Example

```javascript
const notifier = new Notify({
    close: { auto: true, time: 500, delay: 5000 },
    position: 'center',
});

notifier.new({
    type: 'error',
    title: 'Error',
    text: 'Something went wrong!',
});
```

## License

This project is licensed under the MIT License.
