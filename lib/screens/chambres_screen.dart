import 'package:flutter/material.dart';

import '../models/chambre.dart';
import '../widgets/info_card.dart';

class ChambresScreen extends StatelessWidget {
  final List<Chambre> chambres;

  const ChambresScreen({super.key, required this.chambres});

  @override
  Widget build(BuildContext context) {
    if (chambres.isEmpty) {
      return const Center(child: Text('Aucune chambre trouvée'));
    }

    return ListView.builder(
      itemCount: chambres.length,
      itemBuilder: (context, index) {
        final chambre = chambres[index];
        return InfoCard(
          title: 'Chambre ${chambre.number}',
          subtitle:
              'Étage: ${chambre.floor}\nCapacité: ${chambre.capacity}\nStatut: ${chambre.status}',
          icon: Icons.bed,
        );
      },
    );
  }
}
