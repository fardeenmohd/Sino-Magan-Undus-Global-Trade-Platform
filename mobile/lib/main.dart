import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// State Provider for active trade corridor filter
final activeCorridorProvider = StateProvider<String>((ref) => 'Global 🌐');

// State Provider for trade lead prospects list
final tradeLeadsProvider = StateNotifierProvider<TradeLeadsNotifier, List<Map<String, String>>>((ref) {
  return TradeLeadsNotifier();
});

class TradeLeadsNotifier extends StateNotifier<List<Map<String, String>>> {
  TradeLeadsNotifier()
      : super([
          {
            'id': '101',
            'product': 'Organic Makhana (Grade A)',
            'country': 'Germany 🇩🇪',
            'buyer': 'Munich Superfoods GmbH',
            'status': 'VERIFIED PROSPECT'
          },
          {
            'id': '102',
            'product': 'Nashik Red Onions',
            'country': 'Oman 🇴🇲',
            'buyer': 'Salalah Fresh Produce Trading',
            'status': 'RFQ SUBMITTED'
          },
        ]);

  void addLead(Map<String, String> newLead) {
    state = [...state, newLead];
  }
}

void main() {
  runApp(
    const ProviderScope(
      child: SinoMaganMobileCompanionApp(),
    ),
  );
}

class SinoMaganMobileCompanionApp extends StatelessWidget {
  const SinoMaganMobileCompanionApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sino Magan Companion',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF06B6D4),
          brightness: Brightness.dark,
        ),
      ),
      home: const TradeDashboardScreen(),
    );
  }
}

class TradeDashboardScreen extends ConsumerWidget {
  const TradeDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activeCorridor = ref.watch(activeCorridorProvider);
    final tradeLeads = ref.watch(tradeLeadsProvider);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Row(
          children: [
            Text('🌏 Sino Magan Indus', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            SizedBox(width: 8),
            Text('Companion', style: TextStyle(color: Color(0xFF06B6D4), fontSize: 12)),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Active Corridor Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF1E293B)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('ACTIVE MARITIME CORRIDOR', style: TextStyle(color: Colors.grey, fontSize: 10)),
                      const SizedBox(height: 4),
                      Text(activeCorridor, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF06B6D4))),
                    ],
                  ),
                  DropdownButton<String>(
                    value: activeCorridor,
                    dropdownColor: const Color(0xFF0F172A),
                    items: ['Global 🌐', 'Germany 🇩🇪', 'Oman 🇴🇲', 'Japan 🇯🇵', 'USA 🇺🇸']
                        .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                        .toList(),
                    onChanged: (val) {
                      if (val != null) {
                        ref.read(activeCorridorProvider.notifier).state = val;
                      }
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                const Text('Live Trade Lead Prospects', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Chip(
                  label: Text('${tradeLeads.length} Active', style: const TextStyle(fontSize: 10, color: Color(0xFF06B6D4))),
                  backgroundColor: const Color(0xFF0F172A),
                )
              ],
            ),
            const SizedBox(height: 12),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: tradeLeads.length,
              itemBuilder: (context, index) {
                final item = tradeLeads[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFF1E293B)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(item['product'] ?? '', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                          const SizedBox(height: 2),
                          Text('${item['buyer']} • ${item['country']}', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF06B6D4).withOpacity(0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          item['status'] ?? '',
                          style: const TextStyle(color: Color(0xFF06B6D4), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
