import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sino_magan_mobile_companion/main.dart';

void main() {
  testWidgets('Flutter Mobile Companion Riverpod State Test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: SinoMaganMobileCompanionApp(),
      ),
    );

    // Verify title text renders
    expect(find.text('🌏 Sino Magan Indus'), findsOneWidget);
    expect(find.text('Companion'), findsOneWidget);

    // Verify initial trade lead prospect renders
    expect(find.text('Organic Makhana (Grade A)'), findsOneWidget);
    expect(find.text('VERIFIED PROSPECT'), findsOneWidget);
  });
}
