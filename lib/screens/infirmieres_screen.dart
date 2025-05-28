import 'package:flutter/material.dart';

import '../models/infirmiere.dart';
import '../widgets/info_card.dart';

class InfirmieresScreen extends StatelessWidget {
  final List<Infirmiere> infirmieres;

  const InfirmieresScreen({super.key, required this.infirmieres});

  @override
  Widget build(BuildContext context) {
    if (infirmieres.isEmpty) {
      return const Center(child: Text('Aucune infirmière trouvée'));
    }

    return ListView.builder(
      itemCount: infirmieres.length,
      itemBuilder: (context, index) {
        final infirmiere = infirmieres[index];
        return InfoCard(
          title: '${infirmiere.firstName} ${infirmiere.lastName}',
          subtitle:
              'Service: ${infirmiere.service}\nTéléphone: ${infirmiere.phone}',
          icon: Icons.health_and_safety,
        );
      },
    );
  }
}
