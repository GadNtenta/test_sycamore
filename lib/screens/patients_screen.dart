import 'package:flutter/material.dart';

import '../models/patient.dart';
import '../widgets/info_card.dart';

class PatientsScreen extends StatelessWidget {
  final List<Patient> patients;

  const PatientsScreen({super.key, required this.patients});

  @override
  Widget build(BuildContext context) {
    if (patients.isEmpty) {
      return const Center(child: Text('Aucun patient trouvé'));
    }

    return ListView.builder(
      itemCount: patients.length,
      itemBuilder: (context, index) {
        final patient = patients[index];
        return InfoCard(
          title: '${patient.firstName} ${patient.lastName}',
          subtitle:
              'Âge: ${patient.age}\nÉtat de santé: ${patient.healthStatus}',
          icon: Icons.person,
        );
      },
    );
  }
}
