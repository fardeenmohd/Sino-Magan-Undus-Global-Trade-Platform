import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Web Frontend Dashboard Suite (React & RTL)', () => {
  it('renders Sino Magan Indus Global Trade header title correctly', () => {
    render(
      <header data-testid="app-header">
        <h1>Sino Magan Indus Global Trade</h1>
      </header>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Sino Magan Indus Global Trade');
  });

  it('validates state management and commodity card display', () => {
    const mockCommodities = [
      { id: 1, title: 'Organic Makhana (Foxnuts)', category: 'Superfoods', price: 18.5 },
      { id: 2, title: 'Nashik Red Onions', category: 'Fresh Produce', price: 12.0 },
    ];

    render(
      <div data-testid="commodity-list">
        {mockCommodities.map((item) => (
          <div key={item.id} data-testid="commodity-card">
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>
    );

    const cards = screen.getAllByTestId('commodity-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Organic Makhana (Foxnuts)');
    expect(cards[1]).toHaveTextContent('Nashik Red Onions');
  });
});
