import 'package:flutter/material.dart';

import '../models/medecin.dart';
import '../widgets/info_card.dart';

class MedecinsScreen extends StatelessWidget {
  final List<Medecin> medecins;

  const MedecinsScreen({super.key, required this.medecins});

  @override
  Widget build(BuildContext context) {
    if (medecins.isEmpty) {
      return const Center(child: Text('Aucun médecin trouvé'));
    }

    return ListView.builder(
      itemCount: medecins.length,
      itemBuilder: (context, index) {
        final medecin = medecins[index];
        return InfoCard(
          title: '${medecin.firstName} ${medecin.lastName}',
          subtitle:
              'Spécialité: ${medecin.specialty}\nTéléphone: ${medecin.phone}',
          icon: Icons.medical_services,
        );
      },
    );
  }
}
