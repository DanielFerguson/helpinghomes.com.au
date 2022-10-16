import './bootstrap';
import React from 'react'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react'
import 'mapbox-gl/dist/mapbox-gl.css';

createInertiaApp({
  resolve: name => require(`./pages/${name}.tsx`),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />)
  },
})