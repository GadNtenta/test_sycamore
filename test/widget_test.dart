// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../lib/main.dart';

void main() {
  testWidgets('Test de l\'interface principale', (WidgetTester tester) async {
    // Construction de l'application
    await tester.pumpWidget(const MyApp());

    // Vérification du titre de l'application
    expect(find.text('Hôpital Sycamore'), findsOneWidget);

    // Vérification de la présence des onglets de navigation
    expect(find.byIcon(Icons.medical_services), findsOneWidget);
    expect(find.byIcon(Icons.health_and_safety), findsOneWidget);
    expect(find.byIcon(Icons.bed), findsOneWidget);
    expect(find.byIcon(Icons.person), findsOneWidget);

    // Vérification des labels des onglets
    expect(find.text('Médecins'), findsOneWidget);
    expect(find.text('Infirmières'), findsOneWidget);
    expect(find.text('Chambres'), findsOneWidget);
    expect(find.text('Patients'), findsOneWidget);

    // Vérification du bouton de rafraîchissement
    expect(find.byIcon(Icons.refresh), findsOneWidget);
  });
}
